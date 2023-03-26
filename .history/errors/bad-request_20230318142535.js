//const CustomAPIError = require("./custom-api-error");

class BadRequestError extends CustomAPIError{
    constructor(message) {
        super(message)
    }
}

module.exports = BadRequestERROR;