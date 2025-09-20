import JWTHelper from "../../../utils/auth/jwtHelper.mjs"
import models, { sequelize } from "../models/index.mjs"
import { v4 as uuidv4 } from "uuid"
import ServerError from "../../../errors/serverError.mjs"
import { Op } from "sequelize"
import redisService from "./redisService.mjs"
import defaultConfig from "../../../config/default.mjs"

class AuthService {
  async register(data, device) {
    try {
      return await sequelize.transaction(async (t) => {
        const [user, created] = await models.User.findOrCreate({
          where: {
            [Op.or]: [{ email: data.email }, { username: data.username }],
          },
          defaults: data,
          transaction: t,
        })
        if (!created) {
          throw new ServerError(400, "This username or email is already is use")
        }

        const jti = uuidv4()
        const refreshToken = JWTHelper.prepareToken({ userId: user.id, jti }, "refresh")
        const accessToken = JWTHelper.prepareToken({ userId: user.id }, "access")

        await redisService.saveRefreshToken({
          jti,
          userId: user.Id,
          deviceId: device,
          expTimeInSec: defaultConfig.jwt.refresh.expireTime / 1000,
        })

        return {
          refreshToken,
          accessToken,
          user: user.toObj(["password", "registeredAt", "updatedAt"]),
        }
      })
    } catch (error) {
      throw error
    }
  }

  async login(data, device) {
    try {
      const exists = await models.User.findOne({
        where: {
          [Op.or]: [{ email: data.usernameOrEmail }, { username: data.usernameOrEmail }],
        },
        attributes: {
          exclude: ["registeredAt", "updatedAt"],
        },
      })
      if (!exists) {
        throw new ServerError(401, "Credentials are incorrect")
      }
      if (!exists.comparePassword(data.password)) {
        throw new ServerError(401, "Credentials are incorrect")
      }
      const jti = uuidv4()
      const refreshToken = JWTHelper.prepareToken({ userId: exists.id, jti }, "refresh")
      const accessToken = JWTHelper.prepareToken({ userId: exists.id }, "access")

      await redisService.saveRefreshToken({
        jti,
        userId: exists.id,
        deviceId: device,
        expTimeInSec: defaultConfig.jwt.refresh.expireTime / 1000,
      })

      return { refreshToken, accessToken, user: exists.toObj(["password"]) }
    } catch (error) {
      throw error
    }
  }

  async refresh(refreshToken, clearCookieFunc) {
    try {
      if (!refreshToken) throw new ServerError(401, "No refresh token provided")
      const decoded = JWTHelper.verifyRefreshToken(refreshToken)
      const metaData = await redisService.getDataByJti(decoded.jti)
      if (!metaData) {
        clearCookieFunc()
        throw new ServerError(401, "Refresh token is invalid or has expired")
      }
      if (metaData.userId != decoded.userId) {
        clearCookieFunc()
        throw new ServerError(401, "User mismatch")
      }

      const accessToken = JWTHelper.prepareToken({ userId: decoded.userId }, "access")

      return accessToken
    } catch (error) {
      throw error
    }
  }

  async logout(refreshToken, clearCookieFunc) {
    try {
      if (!refreshToken) throw new ServerError(401, "No refresh token provided")
      const decoded = JWTHelper.verifyRefreshToken(refreshToken)
      const isWhitelisted = await redisService.getDataByJti(decoded.jti)
      if (!isWhitelisted) {
        throw new ServerError(401, "Refresh token is invalid")
      }
      await redisService.deleteRefreshToken({ jti: decoded.jti, userId: decoded.userId })
    } catch (error) {
      throw error
    } finally {
      clearCookieFunc()
    }
  }

  async logoutAll(refreshToken, clearCookieFunc) {
    //todo: finish method
  }
}

export default new AuthService()
