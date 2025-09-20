import ServerError from "../errors/serverError.mjs"

export default (app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new ServerError(404, "Not Found")
    next(err)
  })
  // error handler
  app.use((err, req, res, next) => {
    const { code, message } = err
    res.status(code || 500).send({ success: false, error: message })
  })
}
