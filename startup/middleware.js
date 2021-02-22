const session = require('cookie-session')
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
  app.use(
    session({
      name: '__user',
      secret: config.cookieSecret,
      maxAge: 60 * 60 * 24 * 1000 * Number(config.cookieAge), // 15 days
    }),
  )
}
