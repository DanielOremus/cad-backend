import {
  clearRefreshCookie,
  getRefreshFromCookie,
  setRefreshCookie,
} from "../../../utils/auth/refreshCookie.mjs"
import authService from "../services/authService.mjs"
import { validationResult } from "express-validator"

class AuthController {
  static async register(req, res, next) {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ success: false, error: errors.array() })
    // }
    const { username, email, password } = req.body
    try {
      const { refreshToken, accessToken, user } = await authService.register({
        username,
        email,
        password,
      })

      setRefreshCookie(res, refreshToken)
      res.json({ success: true, user, accessToken })
    } catch (error) {
      next(error)
    }
  }
  static async login(req, res, next) {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ success: false, error: errors.array() })
    // }
    const { usernameOrEmail, password } = req.body
    try {
      const { refreshToken, accessToken, user } = await authService.login({
        usernameOrEmail,
        password,
      })

      setRefreshCookie(res, refreshToken)
      res.json({ success: true, user, accessToken })
    } catch (error) {
      next(error)
    }
  }

  static async refresh(req, res, next) {
    try {
      const refreshToken = getRefreshFromCookie(req)
      const accessToken = await authService.refresh(
        refreshToken,
        clearRefreshCookie.bind(null, res)
      )

      res.json({ success: true, accessToken })
    } catch (error) {
      next(error)
    }
  }

  static async logout(req, res, next) {
    try {
      const refreshToken = getRefreshFromCookie(req)
      await authService.logout(refreshToken, clearRefreshCookie.bind(null, res))

      res.json({ success: true, msg: "Logged out successfully!" })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
