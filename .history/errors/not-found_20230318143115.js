const CustomAPIError = require("./custom-api-error");
const {statusCode}


class NotFoundError extends CustomAPIError{
    constructor(message) {
        super(message);
        this.statusCode=Stat
    }
}

module.exports = NotFoundError;