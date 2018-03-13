import _ from 'lodash';
import Fraction from "fraction.js";


let data = null;
let units = null;
let grandeurs = null;

export const initUnits = initial => {

    _.forEach(initial, (units, grandeurName) => {
        _.forEach(units, unit => unit.grandeur = grandeurName);
        initial[grandeurName] = _.sortBy(units, 'coef');
    });

    units = _.chain(initial).values().flatten().keyBy('shortname').value();

    grandeurs = initial;

    data = {
        units,
        grandeurs: initial,
        grandeursKeys: Object.keys(initial),
        shortnames: Object.keys(units)
    };

};

export const getUnits = () => data.units;
export const getGrandeurs = () => data.grandeurs;
export const getGrandeursKeys = () => data.grandeursKeys;
export const getShortnames = () => data.shortnames;


export const unit = shortname => _.has(units, shortname) ? units[shortname] : null;
export const coef = shortname => unit(shortname).coef;
export const base = grandeur => _.find(grandeurs[grandeur], {coef: 1});

export const unitlongname = shortname => unit(shortname).name;
export const grandeur = shortname => unit(shortname).grandeur;

/**
 * @returns faux, ou vrai ssi les unités sont valides et de la même grandeur
 */
export const sameGrandeur = (leftShortname, rightShortname) => {
    const leftUnit = unit(leftShortname);
    const rightUnit = unit(rightShortname);

    return leftUnit && rightUnit && leftUnit.grandeur === rightUnit.grandeur;

};

/**
 * @returns le coef pour passer d'une unité à l'autre. undefined si les unités ne sont pas compatibles.
 */
export const unitCoef = (leftShortname, rightShortname) => sameGrandeur(leftShortname, rightShortname)
    ? Fraction(unit(leftShortname).coef).div(unit(rightShortname).coef).valueOf()
    : undefined;

/**
 * @returns le coef pour passer d'une quantité à l'autre. undefined si les unités ne sont pas compatibles.
 */
export const qtUnitCoef = (leftQuantity, rightQuantity) => leftQuantity && rightQuantity
    ? Fraction(leftQuantity.qt)
        .div(rightQuantity.qt)
        .mul(unitCoef(leftQuantity.unit, rightQuantity.unit)).valueOf()
    : undefined;

/**
 *
 * @param quantity
 * @returns la quantité en unité de base. (10kg => 10000g)
 */
export const toBaseQuantity = quantity => {
    return {
        qt: quantity.qt * coef(quantity.unit),
        unit: base(grandeur(quantity.unit)).shortname
    };
};

const unitsFromShortname = shortname => grandeurs[unit(shortname).grandeur];
export const bestQuantity = (quantity) => {
    const units = unitsFromShortname(quantity.unit);
    const currentUnit = unit(quantity.unit);
    const currentUnitIndex = _.findIndex(units, {shortname: quantity.unit});
    if (currentUnitIndex < units.length - 1) {
        const upperUnit = units[currentUnitIndex + 1];
        const uppingCoef = upperUnit.coef / currentUnit.coef;
        if (quantity.qt >= uppingCoef) {
            return bestQuantity({qt: quantity.qt / uppingCoef, unit: upperUnit.shortname});
        }
    }
    if (currentUnitIndex > 0) {
        const lowerUnit = units[currentUnitIndex - 1];
        const downingCoef = lowerUnit.coef / currentUnit.coef;
        if (quantity.qt <= downingCoef) {
            return bestQuantity({qt: quantity.qt / downingCoef, unit: lowerUnit.shortname});
        }
    }

    return {qt: bestRound(quantity.qt), unit: quantity.unit};
};

export const grandeurOfUnitShortname = shortname => grandeurByName(unit(shortname).grandeur);
export const grandeurByName = grandeurName => ({[grandeurName]: getGrandeurs()[grandeurName]});


const precisionRound = (number, precision) => {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
};
export const bestRound = v =>
    v < 1 ? precisionRound(v,3)
        :
        v < 10 ? precisionRound(v,2)
            :
            v < 100 ? precisionRound(v,1)
                :
                Math.round(v);

export const calcCoef = (axis, leftDenorm, rightDenorm) => {
    const leftAxis = _.find(leftDenorm, {axis});
    const rightAxis = _.find(rightDenorm, {axis});

    return qtUnitCoef(leftAxis, rightAxis);
};
export const baseQt = quantity => quantity.qt * coef(quantity.unit);