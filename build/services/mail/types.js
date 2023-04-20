"use strict";
exports.__esModule = true;
exports.Mail = void 0;
var Mail = /** @class */ (function () {
    function Mail(to) {
        this.from = 'test@email.com';
        this.to = to;
    }
    Mail.prototype.setTo = function (email) {
        this.to = email;
    };
    return Mail;
}());
exports.Mail = Mail;
//# sourceMappingURL=types.js.map