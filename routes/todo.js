const express = require('express')
const { userTodo } = require('../model/todo')
const isAuth = require('../middleware/auth')
const router = express.Router()

router.get('/:id', isAuth, async (req, res) => {
  const todos = await userTodo.findById(req.params.id)

  if (!todos) return res.status(404).send({ message: 'No todos yet' })

  res.send(todos.data)
})

module.exports = router
