import redisClient from "../../../db/redis.mjs"

class RedisService {
  #redis
  constructor(redisClient) {
    this.#redis = redisClient
  }
  async saveRefreshToken({ jti, userId, deviceId, expTimeInSec }) {
    await this.#redis.setEx(`refresh:${jti}`, expTimeInSec, JSON.stringify({ userId, deviceId }))
    await this.#redis.sAdd(`refresh:users:${userId}`, jti)
  }
  async getDataByJti(jti) {
    const json = await this.#redis.get(`refresh:${jti}`)
    return JSON.parse(json)
  }
  async deleteRefreshToken({ jti, userId }) {
    await this.#redis.del(`refresh:${jti}`)
    await this.#redis.sRem(`refresh:users:${userId}`, jti)
  }
}

export default new RedisService(redisClient)
