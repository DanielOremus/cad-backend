import { createClient } from "redis"
import defaultConfig from "../config/default.mjs"
const getRedisClient = async () => {
  const client = await createClient({
    url: defaultConfig.redis.url,
  })
  client.on("error", (err) => {
    console.error("Redis client error:", err)
  })
  client.on("ready", () => {
    console.log("Redis client is ready!")
  })

  await client.connect()

  return client
}

const redisClient = await getRedisClient()

export default redisClient
