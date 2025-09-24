import CRUDService from "./CRUDService.mjs"
import Unit from "../models/unit.mjs"
import { sequelize } from "../models/index.mjs"
import ServerError from "../../../errors/serverError.mjs"
import eventBus from "../events/eventBus.mjs"

class UnitService extends CRUDService {
  async create({ userId, dutyType }) {
    try {
      let [unit, created] = await this.model.findOrCreate({
        where: {
          userId,
        },
        defaults: {
          userId,
          dutyType,
        },
      })
      if (created) {
        unit = await super.getById(unit.id)
      }

      eventBus.emit("unit:go-on-duty", unit)

      return unit
    } catch (error) {
      throw error
    }
  }
  // async updateByUserId(userId, data) {
  //   try {
  //     const unit = await super.getOne({ where: { userId } })
  //     if (!unit) {
  //       throw new ServerError(404, "Unit not found")
  //     }
  //     await super.updateById(unit.id, data, {}, false)
  //   } catch (error) {
  //     throw error
  //   }
  // }
  async updateById(unitId, data) {
    try {
      const unit = await super.updateById(unitId, data)

      if (!unit) {
        throw new ServerError(404, "Unit not found")
      }

      console.log(unit)

      return unit
    } catch (error) {
      throw error
    }
  }
}

export default new UnitService(Unit)
