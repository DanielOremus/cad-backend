function getUnitHandler(io) {
  const goOnDuty = function ({ userId, dutyType }) {
    activeUnits.set(userId, this.id)
    this.join(`duty_${dutyType}`)
  }
  const goOffDuty = function ({ unitId, dutyType }) {
    this.leave(`duty_${dutyType}`)
    activeUnits.delete(unitId)
  }

  return {
    goOnDuty,
    goOffDuty,
  }
}

export default function registerUnitSocketHandler(io, socket) {
  const unitHandler = getUnitHandler(io)
  socket.on("unit:go-on-duty", unitHandler.goOnDuty)
  socket.on("unit:go-off-duty", unitHandler.goOffDuty)
}
