//const CustomAPIError = require("./custom-api-error");

class BadRequestER extends CustomAPIError{
    constructor(message) {
        super(message)
    }
}

module.exports = BadRequestERROR;