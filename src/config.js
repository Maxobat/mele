const fs = require('fs')
const path = require('path')
const InvalidConfigError = require('./error/InvalidConfigError')

const getUnknownKeyMessage = exports.getUnknownKeyMessage = key => `${key} is not a valid config value.`

const getDefaultConfig = exports.getDefaultConfig = () => ({
    port: 4000,
    dev: false,
})

exports.getConfig = () => {
    const configFile = path.resolve('.mele')
    const defaultConfig = getDefaultConfig()

    if (!fs.existsSync(configFile)) {
        return defaultConfig
    }

    const config = fs.readFileSync(configFile)

    try {
        return Object.assign(defaultConfig, JSON.parse(config))
    } catch (e) {
        throw new InvalidConfigError('Could not read config. Make sure it is valid JSON.')
    }
}

exports.validateConfig = config => {
    const defaultConfig = getDefaultConfig()
    const keys = Object.keys(config)
    const defaultKeys = Object.keys(defaultConfig)
    const unknownKeys = keys.filter(key => !defaultKeys.includes(key))
    const messages = unknownKeys.map(getUnknownKeyMessage)

    return {
        valid: !unknownKeys.length,
        unknownKeys,
        messages,
    }
}
