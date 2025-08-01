const AppError = require("./AppError");

class InternalServerError extends AppError {
    constructor() {
        super(`it's not you it's our server error where something went wrong`, 500);
    }
}

module.exports = InternalServerError