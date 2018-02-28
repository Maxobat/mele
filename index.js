const path = require('path')
const mele = require('./mele')
const { observe } = require('./src/observer')
const { getDefaultConfig } = require('./src/config')

module.exports = async(config = {}) => {
    if (config.dev) {
        const observer = observe(path.resolve(__dirname, './silent.js'), './')

        return new Promise(resolve => {
            observer.on('restart', () => {
                console.log('restart')
            })

            observer.on('ready', () => {
                resolve(config, getDefaultConfig())
            })
        })
    }

    return mele(config)
}
