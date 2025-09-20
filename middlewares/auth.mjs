import ServerError from "../errors/serverError.mjs"
import JWTHelper from "../utils/auth/jwtHelper.mjs"
import userService from "../api/v1/services/userService.mjs"

export const requireAuth = async (req, res, next) => {
  const bearer = req.headers.authorization
  if (!bearer) return next(new ServerError(400, "Authorization header is not present"))
  try {
    const decoded = JWTHelper.parseBearer(bearer)
    const user = await userService.getById(decoded.userId)
    if (!user) {
      throw new ServerError(401, "User does not exist")
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
