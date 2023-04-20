export default class StatusError extends Error {
  public statusCode: number;

  /**
   * Creates a new instance of the error
   * @param statusCode {number}
   * @param message {string}
   */
  constructor(statusCode: number, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.statusCode = statusCode || 400;
  }
}
