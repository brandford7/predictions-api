const CustomAPIError = require("./custom-api-error");
const {StatusCodes}


class NotFoundError extends CustomAPIError{
    constructor(message) {
        super(message);
        this.statusCode=Stat
    }
}

module.exports = NotFoundError;