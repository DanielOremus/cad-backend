import { DataTypes, Model } from "sequelize"
import incidentConfig from "shared/incidentConfig.mjs"

class Incident extends Model {
  static initModel(sequelize) {
    return Incident.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        origin: {
          type: DataTypes.ENUM(Object.values(incidentConfig.originEnum)),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(Object.values(incidentConfig.statusEnum)),
          allowNull: false,
        },
        priority: {
          type: DataTypes.ENUM(Object.values(incidentConfig.priorityEnum)),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: "N/A",
        },
        postal: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: "N/A",
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: "No description",
        },
        primaryUnitId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "incident",
        underscored: true,
      }
    )
  }
}

export default Incident
