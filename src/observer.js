const path = require('path')
const EventEmitter = require('events')
const chokidar = require('chokidar')
// const pm2 = require('pm2')
const cp = require('child_process')

exports.observe = (mod, watch) => {
    const ee = new EventEmitter
    const fullPath = path.resolve(watch)
    const watcher = chokidar.watch(fullPath, {
        ignored: /node_modules/,
    })
    let child = cp.fork(mod)

    watcher.on('ready', () => {
        ee.emit('ready')

        watcher.on('all', () => {
            ee.emit('restart')

            // console.log('Detected change. Restarting.')

            child.kill('SIGINT')

            child.on('exit', () => {
                child = cp.fork(mod)
            })
        })
    })

    return ee
}
