const config = require('config-cjs')
const mongoose = require('mongoose')

module.exports = function () {
  mongoose
    .connect(config.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Database Connected'))
    .catch(() => console.log('Error Connecting on database'))
}
