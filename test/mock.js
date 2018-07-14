import {initUnits} from "../src/index";

export const mockGrandeurs = () => loadUnitsData().then(initUnits);

const grandeur = (key, label, units) => ({
    key,
    label,
    units
});

const unit = (shortname, name, coef) =>
    ({
        shortname: shortname,
        name: name,
        coef: coef
    });

export const loadUnitsData = () => Promise.resolve(
    [
        grandeur("Ener", "Energie (wh, J, cal...)", [
            unit("J", "joule", 0.23923445),
            unit("ws", "Watt-Seconde", 0.23923445),
            unit("cal", "calorie", 1),
            unit("wh", "Watt-Heure", 0.23923445 * 3600),
            unit("kwh", "Watt-Heure", 0.23923445 * 3600 * 1000),
            unit("kcal", "kilo-calorie", 1000),
            unit("Mcal", "mega-calorie", 1000 * 1000)
        ]),
        grandeur("Dens", "Densité (mol, mmol...)", [
            unit("μmol", "micro-mole", 0.000001),
            unit("mmol", "milli-mole", 0.001),
            unit("mol", "mole", 1)
        ]),
        grandeur("Nomb", "Nombre (pas d'unité)", [
            unit("count", "", 1)
        ]),
        grandeur("Volu", "Volume (L, m3...)", [
            unit("goutte", "Goutte", 0.001 * 20000),
            unit("L", "Litre (L)", 0.001),
            unit("dL", "Déci-litre (dL)", 0.001 * 0.1),
            unit("cL", "Centi-litre (cL)", 0.001 * 0.01),
            unit("mL", "Milli-litre (mL)", 0.001 * 0.001),
            unit("m3", "Mètre-cube (m3)", 1),
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
        grandeur("Prix", "Prix/Coût (€...)", [
            unit("€", "euro", 1)
        ])
    ]);