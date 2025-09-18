import { Sequelize } from "sequelize"
import defaultConfig from "./default.mjs"

const getSequelizeInstance = async () => {
  const sequelize = new Sequelize({
    host: defaultConfig.db.host,
    password: defaultConfig.db.password,
    username: defaultConfig.db.user,
    database: defaultConfig.db.name,
    logging: false,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  })

  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully!")
    return sequelize
  } catch (error) {
    console.error("Unable to connect to the database: ", error)
  }

  return sequelize
}

const sequelize = await getSequelizeInstance()

export default sequelize
