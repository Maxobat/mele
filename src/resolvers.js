const requireAll = require('require-all')

exports.generateResolversFromDir = path => {
    const dir = requireAll({
        dirname: path,
        map: rawName => {
            const name = rawName.replace(/-|_/, '')

            return name.slice(0, 1).toUpperCase() + name.slice(1)
        },
    })

    return dir
}
