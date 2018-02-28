const path = require('path')
const { listFiles, readFile } = require('./support/file')

const getTypesFromDir = async dirPath => {
    const files = await listFiles(dirPath)

    return Promise.all(
        files.map(file => readFile(path.resolve(dirPath, file)))
    )
}

exports.generateDefinitionFromDir = async path => {
    const types = await getTypesFromDir(path)

    return types.reduce((sum, next) => sum + next)
}
