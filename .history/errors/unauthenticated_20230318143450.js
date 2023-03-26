const CustomAPIError = require("./custom-api-error");


class UnAuthenticatedErr extends CustomAPIError{
    constructor(message) {
        super(message);
        this.Stat
    }
}