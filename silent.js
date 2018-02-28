const mele = require('./mele')
const { getConfig } = require('./src/config')

mele(Object.assign(getConfig(), {silent: true}))
