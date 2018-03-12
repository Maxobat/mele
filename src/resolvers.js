const requireAll = require('require-all')
const MissingDirectoryError = require('./error/MissingDirectoryError')

exports.generateResolversFromDir = path => {
    try {
        const dir = requireAll({
            dirname: path,
            map: rawName => {
                const name = rawName.replace(/-|_/, '')

                return name.slice(0, 1).toUpperCase() + name.slice(1)
            },
        })

        return dir
    } catch (e) {
        throw new MissingDirectoryError('Must have resolvers directory.')
    }
}
