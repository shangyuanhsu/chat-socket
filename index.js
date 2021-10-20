const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const socket = require("socket.io-client")("https://shangyuanhsu.github.io/chat-example/");

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/socket.io/socket.io.js');
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});

