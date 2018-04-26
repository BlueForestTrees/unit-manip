"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.baseQt = exports.calcCoef = exports.bestRound = exports.grandeurByName = exports.grandeurOfUnitShortname = exports.bestQuantity = exports.grandeurFromShortname = exports.toBaseQuantity = exports.qtUnitCoef = exports.unitCoef = exports.sameGrandeur = exports.grandeur = exports.unitlongname = exports.base = exports.coef = exports.unit = exports.getShortnames = exports.getGrandeursKeys = exports.getGrandeurs = exports.getUnits = exports.initUnits = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _fraction = require("fraction.js");

var _fraction2 = _interopRequireDefault(_fraction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = null;
var units = [];
var grandeurs = null;

var initUnits = exports.initUnits = function initUnits(initial) {

    var nbGrandeurs = initial.length;
    for (var g = 0; g < nbGrandeurs; g++) {
        var _grandeur = initial[g];
        var nbUnits = _grandeur.units.length;
        for (var u = 0; u < nbUnits; u++) {
            var _unit = _grandeur.units[u];
            _unit.grandeur = _grandeur.key;
            units[_unit.shortname] = _unit;
        }
    }

    grandeurs = initial;

    data = {
        units: units,
        grandeurs: initial,
        grandeursKeys: (0, _keys2.default)(initial),
        shortnames: (0, _keys2.default)(units)
    };
};

var find = function find(array, key, value) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
        var item = array[i];
        if (item[key] === value) {
            return item;
        }
    }
};
var findIndex = function findIndex(array, key, value) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
        var match = array[i][key] === value;
        if (match) {
            return i;
        }
    }
};

var getUnits = exports.getUnits = function getUnits() {
    return data.units;
};
var getGrandeurs = exports.getGrandeurs = function getGrandeurs() {
    return data.grandeurs;
};
var getGrandeursKeys = exports.getGrandeursKeys = function getGrandeursKeys() {
    return data.grandeursKeys;
};
var getShortnames = exports.getShortnames = function getShortnames() {
    return data.shortnames;
};

var unit = exports.unit = function unit(shortname) {
    return units.hasOwnProperty(shortname) ? units[shortname] : null;
};
var coef = exports.coef = function coef(shortname) {
    return unit(shortname).coef;
};
var base = exports.base = function base(grandeur) {
    var g = find(grandeurs, "key", grandeur);
    return g && find(g.units, "coef", 1);
};

var unitlongname = exports.unitlongname = function unitlongname(shortname) {
    return unit(shortname).name;
};
var grandeur = exports.grandeur = function grandeur(shortname) {
    var u = unit(shortname);
    return u && u.grandeur;
};

/**
 * @returns faux, ou vrai ssi les unités sont valides et de la même grandeur
 */
var sameGrandeur = exports.sameGrandeur = function sameGrandeur(leftShortname, rightShortname) {
    var leftUnit = unit(leftShortname);
    var rightUnit = unit(rightShortname);

    return leftUnit && rightUnit && leftUnit.grandeur === rightUnit.grandeur;
};

/**
 * @returns le coef pour passer d'une unité à l'autre. undefined si les unités ne sont pas compatibles.
 */
var unitCoef = exports.unitCoef = function unitCoef(leftShortname, rightShortname) {
    return sameGrandeur(leftShortname, rightShortname) ? (0, _fraction2.default)(unit(leftShortname).coef).div(unit(rightShortname).coef).valueOf() : undefined;
};

/**
 * @returns le coef pour passer d'une quantité à l'autre. undefined si les unités ne sont pas compatibles.
 */
var qtUnitCoef = exports.qtUnitCoef = function qtUnitCoef(leftQuantity, rightQuantity) {
    return leftQuantity && rightQuantity ? (0, _fraction2.default)(leftQuantity.qt).div(rightQuantity.qt).mul(unitCoef(leftQuantity.unit, rightQuantity.unit)).valueOf() : undefined;
};

/**
 *
 * @param quantity
 * @returns la quantité en unité de base. (10kg => 10000g)
 */
var toBaseQuantity = exports.toBaseQuantity = function toBaseQuantity(quantity) {
    return {
        qt: quantity.qt * coef(quantity.unit),
        unit: base(grandeur(quantity.unit)).shortname
    };
};

var grandeurFromShortname = exports.grandeurFromShortname = function grandeurFromShortname(shortname) {
    var u = unit(shortname);
    return u && find(grandeurs, "key", u.grandeur);
};
var bestQuantity = exports.bestQuantity = function bestQuantity(quantity) {
    var units = grandeurFromShortname(quantity.unit).units;
    var currentUnit = unit(quantity.unit);
    var currentUnitIndex = findIndex(units, "shortname", quantity.unit);
    if (currentUnitIndex < units.length - 1) {
        var upperUnit = units[currentUnitIndex + 1];
        var uppingCoef = upperUnit.coef / currentUnit.coef;
        if (quantity.qt >= uppingCoef) {
            return bestQuantity({ qt: quantity.qt / uppingCoef, unit: upperUnit.shortname });
        }
    }
    if (currentUnitIndex > 0) {
        var lowerUnit = units[currentUnitIndex - 1];
        var downingCoef = lowerUnit.coef / currentUnit.coef;
        if (quantity.qt <= downingCoef) {
            return bestQuantity({ qt: quantity.qt / downingCoef, unit: lowerUnit.shortname });
        }
    }

    return { qt: bestRound(quantity.qt), unit: quantity.unit };
};

var grandeurOfUnitShortname = exports.grandeurOfUnitShortname = function grandeurOfUnitShortname(shortname) {
    return grandeurByName(unit(shortname).grandeur);
};
var grandeurByName = exports.grandeurByName = function grandeurByName(grandeurName) {
    return (0, _defineProperty3.default)({}, grandeurName, getGrandeurs()[grandeurName]);
};

var precisionRound = function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
};
var bestRound = exports.bestRound = function bestRound(v) {
    return v < 1 ? precisionRound(v, 3) : v < 10 ? precisionRound(v, 2) : v < 100 ? precisionRound(v, 1) : Math.round(v);
};

var calcCoef = exports.calcCoef = function calcCoef(axis, leftDenorm, rightDenorm) {
    var leftAxis = find(leftDenorm, "axis", axis);
    var rightAxis = find(rightDenorm, "axis", axis);

    return qtUnitCoef(leftAxis, rightAxis);
};
var baseQt = exports.baseQt = function baseQt(quantity) {
    return quantity.qt * coef(quantity.unit);
};