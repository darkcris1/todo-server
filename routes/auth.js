const express = require('express')
const { User, validateUser } = require('../model/user')
const { hash, verify } = require('../utils/cypter')
const jwt = require('jsonwebtoken')
const config = require('config-cjs')
const mongoose = require('mongoose')

const router = express.Router()

function sender(res, data) {
  // Encapsulate the logic for clean code
  res.setHeader(
    config.jwtToken,
    jwt.sign(data, config.jwtPrivateKey, { expiresIn: '3h' }),
  )
  res.send(data)
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user || !(await verify(password, user.password)))
    return res
      .status(400)
      .send({ error: true, message: 'Incorrect email or password' })

  req.session.userID = user._id
  sender(res, { todoID: user.todoID, username })
})

// Clear cookie
router.get('/logout', (req, res) => {
  res.clearCookie('__user', { path: '/' }).send({ message: 'Cookie Cleared' })
})

// For Sessions
router.get('/session', async (req, res) => {
  const userID = req.session.userID
  if (userID) {
    const { username, todoID } = await User.findOne({ _id: userID })
    return sender(res, { todoID, username })
  }

  return res.status(404).send({ message: 'The user has no session' })
})

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const error = validateUser(req.body)
  if (error)
    return res.status(400).send({
      error: true,
      message: error[Object.keys(error)[0]],
    })
  if (user)
    return res.status(400).send({
      error: true,
      message: 'The user has already been registered',
    })
  const u = new User({
    username,
    password: await hash(password),
    todoID: mongoose.Types.ObjectId().toHexString(),
  })
  const result = await u.save()
  req.session.userID = result._id
  sender(res, { todoID: u.todoID, username })
})

module.exports = router
