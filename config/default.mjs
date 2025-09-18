import { configDotenv } from "dotenv"

configDotenv()

const defaultConfig = {
  app: {
    protocol: process.env.APP_PROTOCOL,
    env: process.env.APP_ENV,
    apiVersion: process.env.API_VERSION,
    port: process.env.APP_PORT,
  },
  db: {
    name: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
  },
  jwt: {
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessSecret: process.env.JWT_ACCESS_SECRET,
  },
}
export default Object.freeze(defaultConfig)
