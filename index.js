const createServer = require('http')
const Server = require('socket.io')

const express = require('express')
const app = express()

const httpServer = createServer();

const PORT = process.env.PORT || 3030
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`))


const messages = [
  {
    channel: "1",
    account: "pub-gmn.eth",
    text: "Welcome to PubCord!"
  },
]


const io = new Server(httpServer, {
  cors: {
    origin: "https://pubcord-lovat.vercel.app/",
    allowedHeaders: ["my-custom-header"],
    credentials: "true",
  }
})

app.use(express.json())

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
