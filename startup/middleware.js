const session = require('express-session')
const cors = require('cors')
const config = require('config-cjs')

module.exports = function (app) {
  app.use(
    cors({
      origin: '*',
      credentials: true,
      exposedHeaders: 'AUTHORIZATION_TOKEN',
    }),
  )
  app.use(
    session({
      name: '__user',
      secret: config.cookieSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60 * 60 * 24 * 1000 * Number(config.cookieAge), // 15 days
      },
    }),
  )
}
