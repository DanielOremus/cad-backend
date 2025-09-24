const applyAssociations = (models) => {
  //User - Unit
  models.User.hasOne(models.Unit)
  models.Unit.belongsTo(models.User)

  //Unit - Incident
  models.Unit.hasOne(models.Incident, {
    foreignKey: {
      name: "primaryUnitId",
      allowNull: true,
    },
  })
  models.Incident.belongsTo(models.Unit, {
    foreignKey: {
      name: "primaryUnitId",
      allowNull: true,
    },
  })
  models.Incident.hasMany(models.Unit, {
    foreignKey: {
      name: "attachedIncidentId",
      allowNull: true,
    },
  })
  models.Unit.belongsTo(models.Incident, {
    foreignKey: {
      name: "attachedIncidentId",
      allowNull: true,
    },
  })
  //Unit - Department
}
export default applyAssociations
