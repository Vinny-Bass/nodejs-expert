const pino = require('pino')

const logger = pino({
  enabled: !(!!process.env.LOG_DISABLED),
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

module.exports = logger