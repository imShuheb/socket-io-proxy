const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app1 = express();
const app2 = express();
const app3 = express();

const server1 = http.createServer(app1);
const server2 = http.createServer(app2);
const server3 = http.createServer(app3);

const io1 = new Server(server1);
const io2 = new Server(server2);
const io3 = new Server(server3);

io1.on('connection', (socket) => {
    console.log('Client connected to WS1');
    socket.on('message', (msg) => {
        console.log(`WS1 received: ${msg}`);
        socket.emit('response', `WS1 received: ${msg}`);
    });
});

io2.on('connection', (socket) => {
    console.log('Client connected to WS2');
    socket.on('message', (msg) => {
        console.log(`WS2 received: ${msg}`);
        socket.emit('response', `WS2 received: ${msg}`);
    });
});

io3.on('connection', (socket) => {
    console.log('Client connected to WS3');
    socket.on('message', (msg) => {
        console.log(`WS3 received: ${msg}`);
        socket.emit('response', `WS3 received: ${msg}`);
    });
});

server1.listen(3001, () => {
    console.log('Socket.IO server running on port 3001.');
});
server2.listen(3002, () => {
    console.log('Socket.IO server running on port 3002.');
});
server3.listen(3003, () => {
    console.log('Socket.IO server running on port 3003.');
});
