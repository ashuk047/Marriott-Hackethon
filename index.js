
const httpServer = require("http").createServer();
this.socket = io('https://marriott-hackethon2-ghgsambkddgaffg7.eastus2-01.azurewebsites.net/');(httpServer);


this.socket.on('connection', (socket) => {
    console.log('A user connected');

    // Handle room joining
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    // Handle messages to a specific room
    socket.on('messageToRoom', (data) => {
        io.to(data.room).emit('message', { id: socket.id, message: data.message });
    });

    // Handle messages to all clients
    socket.on('messageToAll', (data) => {
        io.emit('message', { id: socket.id, message: data.message });
    });

    socket.on('messageFromRoomToStaff', (data) => {
        console.log(`Guest ${data.guestName} in room ${data.room} selected slot: ${data.message}`);
    
        // Create a task here. This could involve saving to a database, logging, etc.
        const task = {
            guestName:data.guestName,
            room: data.room,
            message: data.message,
            timestamp: new Date().toISOString()
        };
    
        // Broadcast the task to all connected clients (or only to admin clients)
        io.emit('newTask', task);
    });

    // Handle private messages
    socket.on('private message', (message, recipient) => {
        // Assuming you have logic to get the socket ID of the recipient
        const recipientSocket = getSocketIdByUserId(recipient);
        if (recipientSocket) {
            io.to(recipientSocket).emit('message', { id: socket.id, message: message });
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});