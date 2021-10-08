class HttpError extends Error {
    constructor(message, errorCode) {
        super(message) //ADD message property
        this.code = errorCode
    }
}

module.exports = HttpError