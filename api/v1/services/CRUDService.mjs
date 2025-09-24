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
  async getOne(opts = {}) {
    try {
      return await this.model.findOne(opts)
    } catch (error) {
      console.error("Error while getting an item: ", error)
    }
  }
  async create(opts = {}) {
    try {
      return await this.model.create(opts)
    } catch (error) {
      console.error("Error while creating item:", error)
    }
  }
  async updateById(itemId, data, opts = {}) {
    try {
      const item = await this.model.findOne({
        where: {
          id: itemId,
        },
        ...opts,
      })
      if (!item) return null
      await item.save(data)
      console.log(item)

      return item
    } catch (error) {
      console.error("Error while updating item by id:", error)
    }
  }
}

export default CRUDService
