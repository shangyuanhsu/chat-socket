//Step1:匯入套件與初始化變數
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    // 處理跨域問題
    allowEIO3: true,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3000;
const users = new Map(); //儲存 Socket id 對應到的使用者名稱

//Step2:設定伺服器路由
app.use(express.static('./'));

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html');
});

server.listen(port, function () {
    console.log('Express https server listening on port 3001');
});

//Step3:設定Socket Server的監聽事件
io.on('connection', (socket) => { //Client連線至Socket Server後，進入此監聽事件
    console.log(`${socket.id} connected`);

    socket.on('join', (name) => { //Client發送join事件後，進入此監聽事件
        users.set(socket.id, name); //儲存Socket id與使用者名稱
        io.emit('new member', name); //向所有人發送new member事件，以傳遞新成員通知
    });

    socket.on('message', (name, msg) => { //Client發送message事件後，進入此監聽事件
        io.emit('new message', name, msg); //向所有人發送new message事件，以傳遞新訊息
    });

    socket.on('disconnect', () => { //Client與Socket Server斷線後，進入此監聽事件
        console.log(`${socket.id} disconnected`);

        const name = users.get(socket.id); //取得Socket id對應的使用者名稱
        io.emit('member leave', name); //向所有人發送member leave事件，以傳遞成員離開通知
    });
});