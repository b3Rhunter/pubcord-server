const express = require('express')
const cors = require('cors')
const app = express()


const PORT = 10000 || 3030

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`))

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Pubcord Online...'
  })
})

const messages = [
  {
    channel: "1",
    account: "pub-gmn.eth",
    text: "Welcome to PubCord!"
  },
]

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('get messages', () => {
    io.emit('get messages', messages)
  })

  socket.on('new message', (msg) => {
    messages.push(msg)
    io.emit('new message', messages)
  })
})


