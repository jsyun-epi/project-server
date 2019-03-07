

function PkRoot(obj) {
    this.packetID = obj['packetID'];
}

PkRoot.prototype = {
    getPacketID : function() {
        return this.packetID;
    }
};

PkRoot.prototype.constructor =  PkRoot;

module.exports = PkRoot;