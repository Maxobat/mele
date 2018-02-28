
exports.isPromise = obj => (
    obj &&
        obj !== null &&
        typeof obj.then === 'function'
)
