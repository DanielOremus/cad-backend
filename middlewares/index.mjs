import path from "path"
import loggerConfig from "../config/logger.mjs"
import cookieParser from "cookie-parser"
import express from "express"
export default (app) => {
  // get the resolved path to the file
  const __dirname = import.meta.dirname // get the name of the directory

  app.set("views", path.join(__dirname, "../views"))
  app.set("view engine", "ejs")

  app.use(loggerConfig)

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, "../public")))
}
