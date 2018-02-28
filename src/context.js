const path = require('path')
const fs = require('fs')

exports.getContext = pathToFile => {
    const fullPath = path.resolve(pathToFile.replace(/\.js|\.\//, '') + '.js')

    if (fs.existsSync(fullPath)) {
        return require(fullPath)
    }

    return {}
}
