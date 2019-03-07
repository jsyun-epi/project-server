
module.exports = Peer;
function Peer() {
    this.clients = [];
}

Peer.prototype.addPeer = function(connection) {
    this.clients.push(connection);
}

Peer.prototype.getPeer = function(guid) {
    this.clients.find((item) => { if(item.getGuid() == guid) return item; })
}

Peer.prototype.getPeerConnectWithID = function(connectToID) {
    return this.clients.find((item) => { if(item.getID() == connectToID) return item; })
}

Peer.prototype.delPeer = function(guid) {
    var index = this.clients.findIndex((item) => { return item.getGuid() == guid; })
    this.clients.splice(index, 1);
}

Peer.prototype.kickoutOldConnection = function(id) {
    //이전 연결이 남아 있다면 중복접속 막기 위해 연결 닫는다.
    var user = this.getPeerConnectWithID(id);
    if(user != undefined) {
        user.getConnection().close();
    }
};

Peer.prototype.getUserList = function() {
    var array = [];
    this.clients.forEach(function(item) {
        array.push(item.id);
    });
    return array;
}

Peer.prototype.sendPeerUTF = function(guid, utf) {
    var user = this.getPeer(guid);
    user.getConnection().sendUTF(utf);
}

Peer.prototype.sendPeerBytes = function(connectToID, bytes) {
    var user = this.getPeerConnectWithID(connectToID);
    user.getConnection().sendBytes(bytes);
}
