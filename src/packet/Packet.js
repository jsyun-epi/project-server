var def = require('./define');
var PkRoot = require('./PkRoot');
var PkLogin = require('./PkLogin');
var PkConnectDevice = require('./PkConnectDevice');

module.exports = Packet;
function Packet() {
}

Packet.prototype.parse = function(json) {
    var obj = JSON.parse(json);
    var packetID = obj['packetID'];
    var result;

    switch(packetID) {
        case def.pkLogin:
            result = new PkLogin(obj);
            break;
        case def.pkReqPairedList:
            result = new PkRoot(obj);
            break;
        case def.pkConnectDevice:
            result = new PkConnectDevice(obj);
            break;

        default:
        // error
            result = null;
    }

    return result;
};

Packet.prototype.makeLoginRes = function(user) {
    var obj = new Object();
    obj.packetID = def.pkLoginRes;
    obj.session = user.getGuid();
    return JSON.stringify(obj);
};

Packet.prototype.makePairedList = function(list, excludeID) {
    var copyList = list.slice();
    copyList = copyList.filter((item) => { return item != excludeID; })

    var obj = new Object();
    obj.packetID = def.pkPairedList;
    obj.list = copyList;
    return JSON.stringify(obj);
};

Packet.prototype.makeConnectDeviceRes = function(connectToID) {
    var obj = new Object();
    obj.packetID = def.pkConnectDeviceRes;
    obj.connectToID = connectToID;
    return JSON.stringify(obj);
};

module.exports.Packet = Packet;