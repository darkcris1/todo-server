const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  todo: { type: String, minLength: 4, maxLength: 30, required: true },
  complete: { type: Boolean, default: false, required: true },
  date: { type: Date, default: () => Date.now() },
  id: { type: String, default: () => mongoose.Types.ObjectId().toHexString() },
})
const userTodo = new mongoose.Schema({
  data: { type: [todoSchema], default: () => [] },
  _id: mongoose.Types.ObjectId,
})

exports.userTodo = mongoose.model('usertodo', userTodo)
