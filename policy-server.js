const net = require('net');

const POLICY_PORT = 843;   // must be 843 for Flash
const CHAT_PORT   = 12345; // same as in chat-server.js

const POLICY_XML =
    '<cross-domain-policy>' +
    '<allow-access-from domain="*" to-ports="' + CHAT_PORT + '" />' +
    '</cross-domain-policy>\0';

const policyServer = net.createServer(socket => {
    console.log('Policy request from', socket.remoteAddress, socket.remotePort);
    socket.write(POLICY_XML);
    socket.end();
});

policyServer.listen(POLICY_PORT, () => {
    console.log('Policy server listening on port', POLICY_PORT);
});
