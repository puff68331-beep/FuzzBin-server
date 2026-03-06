const net = require('net');

const PORT = 12345; // port for Flash XMLSocket
let clients = [];

const server = net.createServer(socket => {
    console.log('Client connected:', socket.remoteAddress, socket.remotePort);
    clients.push(socket);

    socket.setEncoding('utf8');

    socket.on('data', data => {
        // Flash often sends multiple messages together, split by newline
        const messages = data.split('\n').filter(m => m.trim().length > 0);

        messages.forEach(msg => {
            console.log('Received:', msg);

            // Broadcast to all other clients
            clients.forEach(client => {
                if (client !== socket) {
                    client.write(msg + '\n');
                }
            });
        });
    });

    socket.on('end', () => {
        console.log('Client disconnected');
        clients = clients.filter(c => c !== socket);
    });

    socket.on('error', err => {
        console.log('Socket error:', err.message);
        clients = clients.filter(c => c !== socket);
    });
});

server.listen(PORT, () => {
    console.log('Chat server listening on port', PORT);
});
