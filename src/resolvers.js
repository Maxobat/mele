const requireDir = require('require-dir')

exports.generateResolversFromDir = path => {
    const dir = requireDir(path, {
        mapKey: (value, baseName) => {
            const name = baseName.replace(/-|_/, '')

            return name.slice(0, 1).toUpperCase() + name.slice(1)
        },
    })

    return dir
}
