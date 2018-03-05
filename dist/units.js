'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initUnits = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initUnits = exports.initUnits = function initUnits(grandeurs) {

    _lodash2.default.forEach(grandeurs, function (units, grandeurName) {
        _lodash2.default.forEach(units, function (unit) {
            return unit.grandeur = grandeurName;
        });
        grandeurs[grandeurName] = _lodash2.default.sortBy(units, 'coef');
    });

    var units = _lodash2.default.chain(grandeurs).values().flatten().keyBy('shortname').value();

    return {
        units: units,
        grandeurs: grandeurs,
        grandeursKeys: Object.keys(grandeurs),
        shortnames: Object.keys(units)
    };
};