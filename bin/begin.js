#! /usr/bin/env node

const mele = require('../index')
const { getConfig } = require('../src/config')

mele(Object.assign(getConfig(), {dev: true}))
    .then(config => {
        process.stdout.write('\033c')

        console.log('')
        console.log('>>>> initialized. go to http://localhost:' + config.port)
        console.log('')
    })
