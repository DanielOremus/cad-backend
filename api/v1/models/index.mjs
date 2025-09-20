import sequelizeInstance from "../../../db/index.mjs"
import applyAssociations from "./associations.mjs"
import User from "./user.mjs"

const models = Object.freeze({
  User: User.initModel(sequelizeInstance),
})

applyAssociations(models)

export { sequelizeInstance as sequelize }
export default models
