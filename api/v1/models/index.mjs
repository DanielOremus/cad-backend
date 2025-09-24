import sequelizeInstance from "../../../db/index.mjs"
import applyAssociations from "./associations.mjs"
import Incident from "./incident.mjs"
import Unit from "./unit.mjs"
import User from "./user.mjs"

const models = Object.freeze({
  User: User.initModel(sequelizeInstance),
  Unit: Unit.initModel(sequelizeInstance),
  Incident: Incident.initModel(sequelizeInstance),
})

applyAssociations(models)

export { sequelizeInstance as sequelize }
export default models
