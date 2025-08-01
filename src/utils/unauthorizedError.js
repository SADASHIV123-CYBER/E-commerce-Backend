const AppError = require("./AppError");

class UnauthorizedError extends AppError {
    constructor() {
        super(`User is not authorised properly`, 401)
    }
}