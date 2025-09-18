import userService from "../services/userService.mjs"

class userController {
  static async getAll(req, res) {
    try {
      const users = userService.getAll()
      res.json({ success: true, data: users })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.msg })
    }
  }
}

export default userController
