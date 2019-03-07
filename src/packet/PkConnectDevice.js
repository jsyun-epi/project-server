var PkRoot = require('./PkRoot');

module.exports = PkConnectDevice;
function PkConnectDevice(obj) {
    PkRoot.call(this, obj);

    this.connectToID = obj['connectToID'];
}

PkConnectDevice.prototype = Object.create(PkRoot.prototype);

PkConnectDevice.prototype.getConnectToID = function() {
    return this.connectToID;
};

PkConnectDevice.prototype.constructor =  PkConnectDevice;

module.exports.PkConnectDevice = PkConnectDevice;