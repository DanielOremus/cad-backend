import unitService from "../services/unitService.mjs"

class UnitController {
  static async getAllUnits(req, res, next) {
    try {
      const units = await unitService.getAll()
      res.json({ success: true, data: units })
    } catch (error) {
      next(error)
    }
  }
}

export default UnitController
