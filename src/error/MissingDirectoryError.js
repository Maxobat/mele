
class MissingDirectoryError extends Error {
    constructor(...args) {
        super(...args)

        Object.defineProperty(this, 'name', {
            value: this.constructor.name,
        })

        Error.captureStackTrace(this, MissingDirectoryError)
    }
}

module.exports = require('util').inherits(MissingDirectoryError, Error)
