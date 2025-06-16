const { Server } = require('socket.io');

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.on('connection', (socket) => {
        socket.on('sendMessage', (data) => {
            const serverChat = {
                text: data.message,
                isChatOwner: false,
            }
            socket.broadcast.emit('serverSend', serverChat);
        });
    });

    return io;
};

module.exports = setupSocket; 