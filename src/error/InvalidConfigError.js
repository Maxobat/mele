
class InvalidConfigError extends Error {
    constructor(...args) {
        super(...args)

        Object.defineProperty(this, 'name', {
            value: this.constructor.name,
        })

        Error.captureStackTrace(this, InvalidConfigError)
    }
}

module.exports = require('util').inherits(InvalidConfigError, Error)
