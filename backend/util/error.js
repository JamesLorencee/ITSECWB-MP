class HttpError extends Error {
    constructor(status, httpMessage, error) {
        super(httpMessage);
        this.statusCode = status;
        this.error = error;
    }
}

module.exports = HttpError;
