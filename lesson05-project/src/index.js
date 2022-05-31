const server = require('./infra/server')
const logger = require('./infra/utils')

module.exports = server.listen(3000)
  .on('listening', () => logger.info('server running on port 3000'))