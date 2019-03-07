var WebSocketServer = require('websocket').server;
var http = require('http');

var Peer = require('./Peer');
var User = require('./User');

var server = http.createServer(function (req, res) {
    //console.log('Received request for ' + req.url);
    //res.writeHead(404);
    //res.end();
});

server.listen(7999, function () {
    console.log('Server is listening on port 7999');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('connection', function (ws) {
    console.log('client connect...');

    ws.on('message', function (message) {
        console.log("getMessage" + message);
    });

    ws.on('close', function () {
        console.log('client disconnect...');
    });
});

var peerManager = new Peer();

wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);

    var user = new User(connection, peerManager);
    var guid = user.getGuid();
    peerManager.addPeer(user);

    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received message: ' + message.utf8Data);
            //connection.sendUTF(message.utf8Data);
            user.onMessageUTF(message.utf8Data)
        }
        else if (message.type === 'binary') {
            //connection.sendBytes(message.binaryData);
            user.onMessageBytes(message.binaryData)
        }

        connection.on('close', function (reasonCode, description) {
            console.log('Peer ' + connection.remoteAddress + ' disconnected.');
            peerManager.delPeer(guid);
        });
    });
});