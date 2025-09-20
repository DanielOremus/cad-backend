import jwt from "jsonwebtoken"
import defaultConfig from "../../config/default.mjs"
import ServerError from "../../errors/serverError.mjs"

class JWTHelper {
  static parseBearer(bearerToken) {
    let token
    if (!bearerToken.startsWith("Bearer ")) {
      throw new ServerError(401, "Bearer token is invalid")
    }
    try {
      token = bearerToken.slice(7)
      return jwt.verify(token, defaultConfig.jwt.access.secret)
    } catch (error) {
      throw new ServerError(401, "Access token is invalid")
    }
  }
  static prepareToken(payload, tokenType) {
    if (!tokenType) {
      console.error("Token type is required!")
      process.exit(1)
    }
    const tokenConfig = defaultConfig.jwt[tokenType]
    if (!tokenConfig?.secret) {
      console.error("Token type is not supported!")
      process.exit(1)
    }

    return jwt.sign(payload, tokenConfig.secret, {
      expiresIn: tokenConfig.expireTime / 1000,
    })
  }
  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, defaultConfig.jwt.refresh.secret)
    } catch (error) {
      throw new ServerError(401, "Refresh token is invalid")
    }
  }
}

export default JWTHelper
