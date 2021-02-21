const crypto = require('crypto')

// https://dev.to/farnabaz/hash-your-passwords-with-scrypt-using-nodejs-crypto-module-316k

exports.hash = async function (password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(8).toString('hex')

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(salt + ':' + derivedKey.toString('hex'))
    })
  })
}

exports.verify = async function (password, hash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':')
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(key == derivedKey.toString('hex'))
    })
  })
}
