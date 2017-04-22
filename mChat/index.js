/**
 * Created by wangyun on 17/2/18.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("public"))


app.listen(7777);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/view/index.html');
});

io.on('connection', function (socket) {
    console.log("connent")
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
