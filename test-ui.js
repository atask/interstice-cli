const EventEmitter = require('events')
const Command = require('commander').Command
const proxyquire = require('proxyquire')
const {
  ConnectionError,
  DataTimeoutError,
  FileDeleteError
} = require('interstice')

class IntersticeFakeUI extends EventEmitter {
  constructor ({
    timeout = 5000,
    probability = { connection: 0.75, file: 0.75 },
    maxTime = { connection: 3000, file: 5000, stop: 2000 }
  } = {}) {
    super()

    this.status = 'DISCONNECTED'
    this._song = 0
    this._connection = 0
    this._timeout = timeout
    this._probability = probability
    this._maxTime = maxTime
  }

  start (url) {
    this.isStopped = false
    this._drawInterval(() => {
      if (this._test(this._probability.connection)) {
        this.status = 'CONNECTED'
        this._connection++
        this.emit('connection', url)
        this._startSong()
      } else {
        this.emit('error', new ConnectionError({ href: url }))
      }
    }, this._maxTime.connection)
  }

  stop () {
    this.isStopped = true
    this._drawInterval(() => {
      this.emit('stop')
    }, this._maxTime.stop)
  }

  _startSong () {
    let title = `song-${this._connection}-${++this._song}`
    this.emit('song:start', { title })
    this._drawInterval(() => {
      if (this._test(this._probability.connection)) {
        this.emit('song:complete', { title })
        this._startSong()
      } else {
        this.emit('error', new DataTimeoutError(this._timeout))
      }
    }, this._maxTime.file)
  }

  _drawInterval (fn, maxTime) {
    let timeout = Math.random() * maxTime
    return setTimeout(fn, timeout)
  }

  _test (prob) {
    return Math.random() < prob
  }
}

Object.assign(IntersticeFakeUI, {
  ConnectionError,
  DataTimeoutError,
  FileDeleteError
})

process.argv = [
  'node',
  'cli.js',
  'www.example.com'
]

proxyquire('./cli.js', {
  'interstice': IntersticeFakeUI,
  'commander': new Command()
})
