const cors = require('cors')
const config = require('config-cjs')

module.exports = function (app) {
  app.use(
    cors({
      origin: config.clientUrl,
      credentials: true,
      exposedHeaders: 'AUTHORIZATION_TOKEN',
    }),
  )
}
