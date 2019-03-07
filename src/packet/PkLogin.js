var PkRoot = require('./PkRoot');

module.exports = PkLogin;
function PkLogin(obj) {
    PkRoot.call(this, obj);

    this.id = obj['id'];
    this.pw = obj['pw'];
}

PkLogin.prototype = Object.create(PkRoot.prototype);

PkLogin.prototype.getID = function() {
    return this.id;
};

PkLogin.prototype.getPW = function() {
    return this.pw;
};

PkLogin.prototype.constructor =  PkLogin;

module.exports.PkLogin = PkLogin;