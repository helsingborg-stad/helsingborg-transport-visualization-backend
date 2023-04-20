"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/**
 * Omit given set of keys from object.
 * @param initialObject
 * @param keysToOmit
 */
exports["default"] = (function (initialObject, keysToOmit) {
    var objEntries = Object.entries(initialObject);
    return objEntries.reduce(function (accu, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        if (keysToOmit.includes(key)) {
            return accu;
        }
        return __assign(__assign({}, accu), (_b = {}, _b[key] = value, _b));
    }, {});
});
//# sourceMappingURL=omit.js.map