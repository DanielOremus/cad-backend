import { Server } from "socket.io"
import registerUnitSocketHandler from "./unitSocketHandler.mjs"
import { requireSocketAuth } from "../middlewares/socket.mjs"
export default function initSocket(server) {
  const io = new Server(server)

  const userSockets = new Map()

  io.use(requireSocketAuth)

  io.on("connection", (socket) => {
    userSockets.set(socket.user.id, socket.id)
    registerUnitSocketHandler(io, socket)
  })

  return io
}
