class CRUDService {
  constructor(model) {
    this.model = model
  }
  async getAll(opts = {}) {
    try {
      return await this.model.findAll(opts)
    } catch (error) {
      console.error("Error while getting data: ", error)
    }
  }
  async getById(id, opts = {}) {
    try {
      return await this.model.findByPk(id, opts)
    } catch (error) {
      console.error("Error while getting item by id: ", error)
    }
  }
}

export default CRUDService
