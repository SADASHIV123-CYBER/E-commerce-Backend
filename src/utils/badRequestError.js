const AppError = require("./AppError");

class BadRequestError extends AppError {
    constructor(invalidParams) {
        let message = `The request has the following invalid parameters:\n`;

        invalidParams.forEach(params => {
            message += `- ${params}\n`
        });

        super(message.trim(), 400)
    }
}
module.exports = BadRequestError