const initUnits = require("../src/index").initUnits

const mockGrandeurs = function () {
    return loadUnitsData().then(initUnits)
}

const grandeur = function (key, label, units) {
    return {
        key,
        label,
        units
    }
}

const unit = function (shortname, name, coef) {
    return {
        shortname: shortname,
        name: name,
        coef: coef
    }
}

const loadUnitsData = function () {
    return Promise.resolve(
        [
            grandeur("Ener", "Energie (wh, J, cal...)", [
                unit("J", "joule", 0.23923445),
                unit("ws", "Watt-Seconde", 0.23923445),
                unit("cal", "calorie", 1),
                unit("wh", "Watt-Heure", 0.23923445 * 3600),
                unit("kWh", "Watt-Heure", 0.23923445 * 3600 * 1000),
                unit("kcal", "kilo-calorie", 1000),
                unit("Mcal", "mega-calorie", 1000 * 1000)
            ]),
            grandeur("Dens", "Densité (mol, mmol...)", [
                unit("μmol", "micro-mole", 0.000001),
                unit("mmol", "milli-mole", 0.001),
                unit("mol", "mole", 1)
            ]),
            grandeur("Nomb", "Nombre (pas d'unité)", [
                unit("Nomb", "pas d'unité", 1),
                unit("Item(s)", "items", 1)
            ]),
            grandeur("Volu", "Volume (L, m3...)", [
                unit("goutte", "Goutte", 0.001 * 20000),
                unit("L", "Litre", 0.001),
                unit("dL", "Déci-litre", 0.001 * 0.1),
                unit("cL", "Centi-litre", 0.001 * 0.01),
                unit("mL", "Milli-litre", 0.001 * 0.001),
                unit("m3", "Mètre-cube", 1),
            ]),
            grandeur("Duré", "Durée (sec, min, h...)", [
                unit("sec", "seconde", 1),
                unit("min", "minute", 60),
                unit("h", "heure", 60 * 60),
                unit("j", "jour", 60 * 60 * 24),
                unit("mois", "mois", 60 * 60 * 24 * 30 * 355),
                unit("an", "année", 60 * 60 * 24 * 30 * 355 * 12)
            ]),
            grandeur("Mass", "Masse (g, kg...)", [
                unit("mg", "milligramme", 0.001),
                unit("g", "gramme", 1),
                unit("kg", "kilogramme", 1000),
                unit("t", "tonne", 1000000),
                unit("Mt", "mega-tonne", 1000000000)
            ]),
            grandeur("Surf", "Surface (m2, hec...)", [
                unit("m2", "mètre-carré", 1),
                unit("hec", "hectare", 10000)
            ]),
            grandeur("Long", "Longueur (mm, m, km...)", [
                unit("mm", "millimètre", 0.001),
                unit("cm", "centimètre", 0.01),
                unit("m", "mètre", 1),
                unit("km", "kilomètre", 1000)
            ]),
            grandeur("Pri1", "Prix/Coût (€...)", [
                unit("M€", "milliard d'euros", 1000000000),
                unit("m€", "million d'euros", 1000000),
                unit("k€", "Kilo-euro", 1000),
                unit("€", "euo", 1),
            ]),
            grandeur("Pri2", "Prix/Coût (€...)", [
                unit("M$", "Milliard de dollars", 1000000),
                unit("m$", "Million de dollars", 1000000),
                unit("k$", "Kilo-dollar", 1000),
                unit("$", "dollar", 1),
            ]),
            grandeur("Tran", "Transport (t*km...)", [
                unit("t*km", "Tonne Kilomètre", 1),
                unit("kg*km", "Kilogramme Kilomètre", 0.001)
            ])
        ])
}

module.exports = {
    mockGrandeurs:mockGrandeurs,
    grandeur:grandeur,
    loadUnitsData:loadUnitsData
}