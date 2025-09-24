import app from "../app.mjs"
import http from "http"
import syncDevTables from "../utils/db/syncTables.mjs"
import seedDb from "../seed/index.mjs"
import defaultConfig from "../config/default.mjs"
import redisClient from "../db/redis.mjs"
import initSocket from "../socket/index.mjs"
import registerEventHandlers from "../events/index.mjs"

async function startServer() {
  const port = normalizePort(defaultConfig.app.port || "3000")
  app.set("port", port)

  const server = http.createServer(app)

  await syncDevTables("force")

  await seedDb()

  // await redisClient.connect()

  const io = initSocket(server)

  registerEventHandlers(io)

  server.listen(port)
  server.on("error", onError)
  server.on("listening", onListening.bind(null, server))
}

function normalizePort(val) {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges")
      process.exit(1)

    case "EADDRINUSE":
      console.error(bind + " is already in use")
      process.exit(1)

    default:
      throw error
  }
}
function onListening(server) {
  const addr = server.address()
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
  console.log("Server is listening on " + bind)
}

startServer()
