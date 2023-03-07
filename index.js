const express = require('express')
const app = express()

const PORT = process.env.PORT || 3030
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`))

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.get('host') + req.url)
  }
  next()
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
    origin: ["https://pubcord-lovat.vercel.app"]
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

// Set the Access-Control-Allow-Origin header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pubcord-lovat.vercel.app')
  next()
})
