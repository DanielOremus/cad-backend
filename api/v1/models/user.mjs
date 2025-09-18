import { Model } from "sequelize"
import sequelize from "../../../config/db.mjs"

class User extends Model {}

User.init(
  {},
  {
    sequelize,
    modelName: "user",
    underscored: true,
  }
)

export default User
