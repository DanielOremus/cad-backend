import CRUDService from "./CRUDService.mjs"
import models from "../models/index.mjs"

class UserService extends CRUDService {
  async getAll() {
    return await super.getAll({
      attributes: {
        exclude: ["password"],
      },
    })
  }
}

export default new UserService(models.User)
