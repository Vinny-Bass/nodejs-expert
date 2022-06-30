export default class NotImplementedException extends Error {
  constructor(message) {
    super(`The ${message} was not implemented`)
    this.name = "NotImplementedException"
  }
}