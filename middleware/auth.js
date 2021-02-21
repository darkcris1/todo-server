const jwt = require('jsonwebtoken')
const config = require('config-cjs')

module.exports = function (req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')

  if (token && token[0] === 'Bearer') {
    jwt.verify(token[1], config.jwtPrivateKey, (err) => {
      if (err) return res.status(401).send({ message: 'Invalid token' })

      next()
    })
  } else {
    res.status(401).send({ message: 'Invalid Token' })
  }
}
