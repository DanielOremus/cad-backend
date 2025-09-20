import { DataTypes, Model } from "sequelize"
import bcrypt from "bcrypt"
class User extends Model {
  static initModel(sequelize) {
    return User.init(
      {
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        avatar: {
          type: DataTypes.BLOB,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        emailConfirmed: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        adminConfirmed: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(plainPassword) {
            const hashedPassword = bcrypt.hashSync(plainPassword, 10)
            this.setDataValue("password", hashedPassword)
          },
        },
      },
      {
        sequelize,
        modelName: "user",
        underscored: true,
        updatedAt: false,
        createdAt: "registeredAt",
      }
    )
  }
  comparePassword(plainPassword) {
    return bcrypt.compareSync(plainPassword, this.getDataValue("password"))
  }
  toObj(exclude = []) {
    const user = this.get({ plain: true })
    exclude.forEach((field) => {
      delete user[field]
    })

    return user
  }
}

export default User
