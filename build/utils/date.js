"use strict";
exports.__esModule = true;
exports.addDays = void 0;
/**
 * Add a number of days to a given date.
 * @param daysToAdd
 * @param startDate
 */
var addDays = function (daysToAdd, startDate) {
    if (startDate === void 0) { startDate = new Date(); }
    var result = new Date(startDate);
    result.setDate(result.getDate() + daysToAdd);
    return result;
};
exports.addDays = addDays;
//# sourceMappingURL=date.js.map