const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3030 // Use process.env.PORT or 3030 if PORT is not defined

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
const httpServer = require("http").createServer(app); // Define httpServer variable
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
    allowedTransports: ["websocket", "polling"]
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

httpServer.listen(PORT, () => console.log(`Listening on ${PORT}\n`))
