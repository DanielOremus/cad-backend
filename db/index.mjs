import { Sequelize } from "sequelize"
import defaultConfig from "../config/default.mjs"

const getSequelizeInstance = async () => {
  try {
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
    await sequelize.authenticate()
    console.log("Connected to DB successfully!")
    return sequelize
  } catch (error) {
    console.error("Unable connect to the DB:", error)
    process.exit(1)
  }
}

const sequelizeInstance = await getSequelizeInstance()

export default sequelizeInstance
