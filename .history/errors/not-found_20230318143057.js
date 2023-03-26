const CustomAPIError = require("./custom-api-error");


class NotFoundError extends CustomAPIError{
    constructor(message) {
        super(message);
        this.statusCode=
    }
}

module.exports = NotFoundError;