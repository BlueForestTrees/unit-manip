const Fraction = require("fraction.js")

let ctx = null

const initUnits = function (grandeurs) {
    grandeurs.sort((a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0)
    const grandeursKeys = []
    const units = {}
    const nbGrandeurs = grandeurs.length
    for (let g = 0; g < nbGrandeurs; g++) {
        const grandeur = grandeurs[g]
        const nbUnits = grandeur.units.length
        grandeursKeys.push(grandeur.key)
        grandeur.units.sort((a, b) => a.coef - b.coef)
        for (let u = 0; u < nbUnits; u++) {
            const unit = grandeur.units[u]
            unit.grandeur = grandeur.key
            units[unit.shortname] = unit
        }
    }

    ctx = {
        units,
        grandeurs,
        grandeursKeys,
        shortnames: Object.keys(units)
    }
}

const map = function (array, fct) {
    const length = array.length
    const res = []
    for (let i = 0; i < length; i++) {
        res.push(fct(array[i]))
    }
    return res
}

const filter = function (array, fct) {
    const length = array.length
    const res = []
    for (let i = 0; i < length; i++) {
        if (fct(array[i])) {
            res.push(array[i])
        }
    }
    return res
}
const find = function (array, key, value) {
    const length = array.length
    for (let i = 0; i < length; i++) {
        const item = array[i]
        if (item[key] === value) {
            return item
        }
    }
}
const findIndex = function (array, key, value) {
    const length = array.length
    for (let i = 0; i < length; i++) {
        const match = array[i][key] === value
        if (match) {
            return i
        }
    }
    return -1
}

const getUnits = function () {
    return ctx.units
}
const getGrandeur = function (key) {
    return find(ctx.grandeurs, "key", key)
}
const getGrandeurs = function () {
    return ctx.grandeurs
}
const getGrandeursKeys = function () {
    return ctx.grandeursKeys
}
const getShortnames = function () {
    return ctx.shortnames
}


const unit = function (shortname) {
    return ctx.units.hasOwnProperty(shortname) ? ctx.units[shortname] : null
}
const coef = function (shortname) {
    return unit(shortname).coef
}
const gKeyTobUnit = function (gKey) {
    let g = getGrandeur(gKey)
    return g && find(g.units, "coef", 1)
}

const unitlongname = function (shortname) {
    return unit(shortname).name
}
/**
 * le code grandeur du code unité ou null
 * @param shortname
 * @returns {*}
 */
const grandeur = function (shortname) {
    const u = unit(shortname)
    return u && u.grandeur
}

/**
 * @returns faux, ou vrai ssi les unités sont valides et de la même grandeur
 */
const sameGrandeur = function (leftShortname, rightShortname) {
    const leftUnit = unit(leftShortname)
    const rightUnit = unit(rightShortname)

    return leftUnit && rightUnit && leftUnit.grandeur === rightUnit.grandeur

}

/**
 * @returns le coef pour passer d'une unité à l'autre. undefined si les unités ne sont pas compatibles.
 */
const unitCoef = function (leftShortname, rightShortname) {
    return sameGrandeur(leftShortname, rightShortname) ?
        leftShortname === rightShortname ?
            1
            : Fraction(unit(leftShortname).coef).div(unit(rightShortname).coef).valueOf()
        : undefined
}

/**
 * @returns le coef pour passer d'une quantité à l'autre. undefined si les unités ne sont pas compatibles.
 */
const qtUnitCoef = function (leftQuantity, rightQuantity) {
    return leftQuantity && rightQuantity
        ? Fraction(leftQuantity.qt)
            .div(rightQuantity.qt)
            .mul(unitCoef(leftQuantity.unit, rightQuantity.unit)).valueOf()
        : undefined
}

/**
 *
 * @param quantity
 * @returns la quantité en unité de base. (10kg => 10000g)
 */
const toBaseQuantity = function (quantity) {
    return {
        qt: quantity.qt * coef(quantity.unit),
        unit: gKeyTobUnit(grandeur(quantity.unit)).shortname
    }
}

const toBqtG = function (quantity) {
    return {
        bqt: baseQt(quantity),
        g: grandeur(quantity.unit)
    }
}

const bqtGToQtUnit = function ({bqt, g}, coef = 1) {
    const bUnit = gKeyTobUnit(g)
    return {
        qt: bqt * coef, unit: bUnit && bUnit.shortname || `${g}!`
    }
}

const changeUnit = function (quantity, newUnit) {
    return quantity.qt * unitCoef(quantity.unit, newUnit)
}

const grandeurFromShortname = function (shortname) {
    const u = unit(shortname)
    return u && find(ctx.grandeurs, "key", u.grandeur)
}
const bestQuantity = function (quantity) {
    const grandeur = grandeurFromShortname(quantity.unit)
    if (!grandeur) return {qt: quantity.qt, unit: quantity.unit + "!"}

    if (quantity.qt < 0) {
        return invert(bestQuantity(invert(quantity)))
    }

    const units = grandeur.units
    const currentUnit = unit(quantity.unit)
    const currentUnitIndex = findIndex(units, "shortname", quantity.unit)
    if (currentUnitIndex < units.length - 1) {
        const upperUnit = units[currentUnitIndex + 1]
        const uppingCoef = upperUnit.coef / currentUnit.coef
        if (uppingCoef > 1 && quantity.qt >= uppingCoef) {
            return bestQuantity({qt: quantity.qt / uppingCoef, unit: upperUnit.shortname})
        }
    }
    if (currentUnitIndex > 0) {
        const lowerUnit = units[currentUnitIndex - 1]
        const downingCoef = lowerUnit.coef / currentUnit.coef
        if (downingCoef < 1 && quantity.qt <= downingCoef) {
            return bestQuantity({qt: quantity.qt / downingCoef, unit: lowerUnit.shortname})
        }
    }

    return {qt: bestRound(quantity.qt), unit: quantity.unit}
}

const invert = function (quantity) {
    return {...quantity, qt: -quantity.qt}
}

const grandeurOfUnitShortname = function (shortname) {
    return grandeurByName(unit(shortname).grandeur)
}
const grandeurByName = function (grandeurName) {
    return {[grandeurName]: getGrandeurs()[grandeurName]}
}


const precisionRound = function (number, precision) {
    const factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
}
const bestRound = function (v) {
    return v < 1 ? precisionRound(v, 3)
        :
        v < 10 ? precisionRound(v, 2)
            :
            v < 100 ? precisionRound(v, 1)
                :
                Math.round(v)
}

const baseQt = function (quantity) {
    return quantity.qt * coef(quantity.unit)
}


module.exports = {
    map: map,
    filter: filter,
    find: find,
    findIndex: findIndex,
    initUnits: initUnits,
    unit: unit,
    coef: coef,
    getShortnames: getShortnames,
    getGrandeursKeys: getGrandeursKeys,
    getGrandeurs: getGrandeurs,
    getGrandeur: getGrandeur,
    getUnits: getUnits,
    baseQt: baseQt,
    bestRound: bestRound,
    precisionRound: precisionRound,
    grandeurByName: grandeurByName,
    grandeurOfUnitShortname: grandeurOfUnitShortname,
    bestQuantity: bestQuantity,
    grandeurFromShortname: grandeurFromShortname,
    changeUnit: changeUnit,
    bqtGToQtUnit: bqtGToQtUnit,
    toBqtG: toBqtG,
    toBaseQuantity: toBaseQuantity,
    qtUnitCoef: qtUnitCoef,
    unitCoef: unitCoef,
    sameGrandeur: sameGrandeur,
    grandeur: grandeur,
    unitlongname: unitlongname,
    gKeyTobUnit: gKeyTobUnit,

}