const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
  socket.on('chat message', (msg) => {
    console.log('new message: ' + msg);
    io.emit('chat message', msg);
  });
});

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
    });


server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
