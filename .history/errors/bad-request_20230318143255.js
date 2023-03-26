const CustomAPIError = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomAPIError {
  constructor(message) {
      super(message);
      this.StatusCode=Status
  }
}

module.exports = BadRequestError;
