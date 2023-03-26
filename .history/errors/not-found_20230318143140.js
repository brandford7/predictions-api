const CustomAPIError = require("./custom-api-error");
const {StatusCodes} = require('http-status-codes')


class NotFoundError extends CustomAPIError{
    constructor(message) {
        super(message);
        this.statusCode=Status
    }
}

module.exports = NotFoundError;