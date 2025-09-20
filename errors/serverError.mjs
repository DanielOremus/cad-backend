class ServerError extends Error {
  constructor(code, message, name = null) {
    super(message)
    this.code = code
    this.name = name
  }
}

export default ServerError
