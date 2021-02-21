const { userTodo } = require('../model/todo')
const jwt = require('jsonwebtoken')
const config = require('config-cjs')

module.exports = function (io) {
  io.on('connection', (socket) => {
    // <SaveTodo>
    socket.on('save-todo', ({ token, data }, callback) => {
      jwt.verify(token, config.jwtPrivateKey, async (err, decoded) => {
        if (err) return callback && callback('Token is not valid')
        try {
          await userTodo.findOneAndUpdate(
            { _id: decoded.todoID },
            { data },
            {
              setDefaultsOnInsert: true,
              useFindAndModify: false,
              upsert: true,
            },
          )
        } catch (_) {
          return callback('unexpected Error Occured')
        }
      })
    })
    // </SaveTodo>
  })
}
