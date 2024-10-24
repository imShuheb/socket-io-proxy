const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { io: Client } = require('socket.io-client');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.send('Socket.IO Proxy running on port 3000');
});

io.of('/ws1').on('connection', (socket) => {
    const targetSocket = Client('http://localhost:3001');

    socket.on('message', (msg) => {
        targetSocket.emit('message', msg);
    });

    socket.on('disconnect', () => {
        targetSocket.disconnect();
    });
});

io.of('/ws2').on('connection', (socket) => {
    const targetSocket = Client('http://localhost:3002');

    socket.on('message', (msg) => {
        console.log('Proxy received on /ws2:', msg);
        targetSocket.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected from proxy on /ws2.');
        targetSocket.disconnect();
    });
});

io.of('/ws3').on('connection', (socket) => {

    const targetSocket = Client('http://localhost:3003');

    socket.on('message', (msg) => {
        console.log('Proxy received on /ws3:', msg);
        targetSocket.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected from proxy on /ws3.');
        targetSocket.disconnect();
    });
});

server.listen(3000, () => {
    console.log('Socket.IO Proxy server running on port 3000.');
});
