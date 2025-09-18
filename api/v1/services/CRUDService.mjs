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
}

export default CRUDService
