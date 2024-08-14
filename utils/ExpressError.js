class ExpressError extends Error {
    constructor(statusCode, message) {  // Corrected parameter name
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;
