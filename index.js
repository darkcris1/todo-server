const express = require('express')
require('express-async-errors')

const app = express()

app.set('trust proxy', 1)

if (app.get('env') === 'development') {
  require('dotenv').config()
}

const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.json())

require('./startup/middleware')(app)
require('./startup/db')()
require('./startup/socket')(io)

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/todo', require('./routes/todo'))
app.use(require('./middleware/error'))

const PORT = process.env.PORT || 8700

http.listen(PORT, () => console.log(`Server running on ${PORT}`))
