import unitConfig from "shared/unitConfig.mjs"
import eventBus from "./eventBus.mjs"

function getUnitHandler(io) {
  const goOnDuty = function (unit) {
    io.to(`duty_${unitConfig.dutiesEnum.DISPATCH}`).emit("unit:went-on-duty", {
      unit: unit.toJSON(),
    })
  }
  const goOffDuty = function (unit) {
    io.to([`duty_${unitConfig.dutiesEnum.DISPATCH}`]).emit("unit:went-off-duty", {
      unitId: unit.id,
    })
  }

  const update = function (unit) {
    io.to(`duty_${unitConfig.dutiesEnum.DISPATCH}`).emit("unit:updated", {
      unit: unit.toJSON(),
    })
  }

  return {
    goOnDuty,
    goOffDuty,
    update,
  }
}

export default function registerUnitEventHandler(io) {
  const unitHandler = getUnitHandler(io)
  eventBus.on("unit:go-on-duty", unitHandler.goOnDuty)
  eventBus.on("unit:go-ff-duty", unitHandler.goOffDuty)
  eventBus.on("unit:update", unitHandler.update)
}
