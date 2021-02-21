const jm = require('json-msg')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, minLength: 4, maxLength: 50 },
  password: String,
  createdAt: { type: Date, default: () => Date.now() },
  todoID: mongoose.Types.ObjectId,
})

function validate(data) {
  const schema = {
    username: jm.str({ min: 4, max: 50, alphanum: true }),
    password: jm.str({ min: 4, max: 50 }),
    confirmPassword: jm.sameAs('password'),
  }
  return jm.validate(data, schema)
}

exports.User = mongoose.model('user', userSchema)
exports.validateUser = validate
