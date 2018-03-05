const path = require('path')
const { GraphQLServer } = require('graphql-yoga')
const { getDefaultConfig, validateConfig } = require('./src/config')
const InvalidConfigError = require('./src/error/InvalidConfigError')
const { generateDefinitionFromDir } = require('./src/types')
const { mockApp } = require('./src/resolvers')
const { getContext } = require('./src/context')

module.exports = async ownConfig => {
    const validator = validateConfig(ownConfig)

    if (!validator.valid) {
        const [message] = validator.messages

        throw new InvalidConfigError(message)
    }

    const defaultConfig = getDefaultConfig()
    const config = Object.assign(defaultConfig, ownConfig)

    const def = await generateDefinitionFromDir(path.resolve('types'))
    const resolvers = mockApp(path.resolve('resolvers'))
    const context = getContext('context')

    return new Promise(resolve => {
        return new GraphQLServer({
            typeDefs: def,
            resolvers,
            context,
            port: config.port,
        }).start(() => {
            resolve(config)
        })
    })
}
