import { Model, DataTypes } from "sequelize"
import unitConfig from "shared/unitConfig.mjs"

class Unit extends Model {
  static initModel(sequelize) {
    return Unit.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        callsign: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: "No callsign",
        },
        departmentId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        dutyType: {
          type: DataTypes.ENUM(Object.values(unitConfig.dutiesEnum)),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(Object.values(unitConfig.statusEnum)),
          allowNull: true,
          defaultValue: unitConfig.statusEnum.OUT_OF_SERVICE,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        attachedIncidentId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "unit",
        timestamps: false,
        underscored: true,
      }
    )
  }
}

export default Unit
