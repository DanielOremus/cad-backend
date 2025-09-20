import { sequelize } from "../../api/v1/models/index.mjs"
import defaultConfig from "../../config/default.mjs"

//TODO: remake sync from sequelize.sync to model.sync

const syncModesActions = {
  alter: (sequelize) => sequelize.sync({ alter: true }),
  default: (sequelize) => sequelize.sync(),
  force: (sequelize) => sequelize.sync({ force: true }),
}

export default async function syncDevTables(mode = "default") {
  try {
    const env = defaultConfig.app.env || "production"
    if (env === "development") {
      if (syncModesActions[mode]) {
        await syncModesActions[mode](sequelize)
        console.log(`Synchronized tables successfully! (${mode})`)
      } else {
        console.error("Provided sync mode is not supported!")
      }
    }
  } catch (error) {
    console.error("Failed to sync tables:", error)
    process.exit(1)
  }
}
