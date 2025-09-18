import express from "express"
import routes from "./api/v1/routes/index.mjs"
import middleware from "./middlewares/index.mjs"
import errorHandler from "./middlewares/errorHandler.mjs"
const app = express()

middleware(app)
app.use("/v1", routes)
errorHandler(app)

export default app
