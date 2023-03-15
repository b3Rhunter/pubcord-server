const express = require('express');
const app = express();
const server = require('./socket');

const PORT = process.env.PORT || 3030;

server.attach(app.listen(PORT, () => console.log(`Listening on ${PORT}\n`)));
