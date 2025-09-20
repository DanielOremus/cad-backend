import userService from "../services/userService.mjs"

class UserController {
  static async getAll(req, res, next) {
    try {
      const users = await userService.getAll()
      res.json({ success: true, data: users })
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
