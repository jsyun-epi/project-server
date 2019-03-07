var uuid = require('uuid/v4');
var Packet = require('./packet/Packet');
var def = require('./packet/define');

module.exports = User;
function User(connection, peerManager) {
    this.connection = connection;
    this.peerManager = peerManager;
    this.guid = uuid();
    this.packet = new Packet();
    this.id = '';
    this.pw = '';
    this.connectToID = '';
}

User.prototype.getGuid = function() {
    return this.guid;
};

User.prototype.getID = function() {
    return this.id;
};

User.prototype.getConnection = function() {
    return this.connection;
};

User.prototype.getConnectToID = function() {
    return this.connectToID;
};

User.prototype.setConnectToID = function(connectToID) {
    this.connectToID = connectToID;
};

User.prototype.onMessageUTF = function(utf) {
    var pk = this.packet.parse(utf);

    switch(pk.getPacketID()) {
        case def.pkLogin:
            this.onRecvLogin(pk);
            break;
        case def.pkReqPairedList:
            this.onRecvReqPairedList(pk);
            break;
        case def.pkConnectDevice:
            this.onRecvConnectDevice(pk);
            break;
        case def.pkRegistDevice:

            break;

        default:
            // error
            result = null;
    }
    //peerManager.sendPeerUTF()
};

User.prototype.onRecvLogin = function(pk) {
    this.peerManager.kickoutOldConnection(pk.getID());

    this.id = pk.getID();
    this.pw = pk.getPW();

    var json = this.packet.makeLoginRes(this);
    this.connection.sendUTF(json);
};

User.prototype.onRecvReqPairedList = function(pk) {
    var json = this.packet.makePairedList(this.peerManager.getUserList(), this.id);
    this.connection.sendUTF(json);
};

User.prototype.onRecvConnectDevice = function(pk) {
    //set connectToID between both device
    var connectToID = pk.getConnectToID();
    var user = this.peerManager.getPeerConnectWithID(connectToID);

    this.setConnectToID(connectToID);
    var json = this.packet.makeConnectDeviceRes(this.connectToID);
    this.connection.sendUTF(json);

    user.setConnectToID(this.id);
    json = user.packet.makeConnectDeviceRes(this.id);
    user.connection.sendUTF(json);
};

User.prototype.onMessageBytes = function(bytes) {
    //only communicate to connectDevice
    //translate to connectDevice
    this.peerManager.sendPeerBytes(this.connectToID, bytes);
};

module.exports.User = User;