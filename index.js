const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


//socket
const { Server } = require("socket.io");
// const io = new Server(server);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "https://shangyuanhsu.github.io/chat-example/",
      methods: ["GET", "POST"]
    }
  });
app.get('/', (req, res) => {
    //   res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

//socket
//單一個使用者
// io.on('connection', (socket) => {
//     console.log('a user connected');
//   });
//兩個使用者
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//     });
// });
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
// io.on('connection', (socket) => {
//     socket.broadcast.emit('hi');
// });
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});


// const app = require('express')();
// const http = require('http').Server(app);
// var io = require('socket.io')(server); 
// // const io = require('socket.io')(http);
// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', msg => {
//     io.emit('chat message', msg);
//   });
// });

// http.listen(port, () => {
//   console.log(`Socket.IO server running${port}`);
// });
