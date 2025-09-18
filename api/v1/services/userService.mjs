import CRUDService from "./CRUDService.mjs"
import User from "../models/user.mjs"

class userService extends CRUDService {}

export default new userService(User)
