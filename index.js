const express = require('express')
const app = express()

const PORT = 80 || 3030
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`))

const messages = [
  {
    channel: "1",
    account: "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa",
    text: "Welcome to Dappcord!"
  },
]

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "https://pubcord-lovat.vercel.app/"
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
