const fs = require('fs')

exports.listFiles = path => new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
        if (err) {
            return reject(err)
        }

        resolve(files)
    })
})

exports.readFile = path => new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            return reject(err)
        }

        resolve(data)
    })
})
