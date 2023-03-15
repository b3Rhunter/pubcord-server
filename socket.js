const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
});

const messages = [
  {
    channel: '1',
    account: 'pub-gmn.eth',
    text: 'Welcome to PubCord!',
  },
];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('get messages', () => {
    io.emit('get messages', messages);
  });

  socket.on('new message', (msg) => {
    messages.push(msg);
    io.emit('new message', messages);
  });
});

module.exports = io;
