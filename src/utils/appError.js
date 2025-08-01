class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
        Error.captureStackTrace(statusCode, this.constructor)
    }
}

module.exports = AppError