import { configDotenv } from "dotenv"

configDotenv()

const defaultConfig = Object.freeze({
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
  redis: {
    user: process.env.REDIS_USER,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    get url() {
      return `redis://${this.user}:${this.password}@${this.host}:${this.port}`
    },
  },
  jwt: {
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expireTime: 7 * 24 * 3600 * 1000, //7d
    },
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      expireTime: 15 * 60 * 1000, //15 minutes
    },
  },
})
export default defaultConfig
