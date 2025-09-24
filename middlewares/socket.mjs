import unitConfig from "shared/unitConfig.mjs"
import JWTHelper from "../utils/auth/jwtHelper.mjs"
import userService from "../api/v1/services/userService.mjs"
export function validateDutyType(data, next) {
  const { dutyType } = data
  console.log(dutyType)

  console.log(next)
}

export async function requireSocketAuth(socket, next) {
  try {
    const bearer = socket.handshake.auth.token
    if (!bearer) throw new Error("Token is required")
    const decoded = JWTHelper.parseBearer(bearer)
    const user = await userService.getById(decoded.userId)
    if (!user) throw new Error("User does not exist")
    socket.user = user
    next()
  } catch (error) {
    next(error)
  }
}
