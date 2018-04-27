import chai from 'chai';
import {getGrandeursKeys, getShortnames, getUnits} from "../../src/index";
import {mockGrandeurs} from "../mock";
import {getGrandeur} from "../../src";

chai.should();

beforeEach(async () => {
    await mockGrandeurs();
});

describe('TU Init', function () {

    it('getShortnames ok', async function () {
        getShortnames().should.deep.equal([
            "μmol",
            "mmol",
            "mol",
            "sec",
            "min",
            "h",
            "j",
            "mois",
            "an",
            "J",
            "ws",
            "cal",
            "wh",
            "kcal",
            "kwh",
            "Mcal",
            "mm",
            "cm",
            "m",
            "km",
            "mg",
            "g",
            "kg",
            "t",
            "Mt",
            "count",
            "€",
            "m2",
            "hec",
            "L",
            "m3",
            "goutte"
        ]);
    });

    it('getGrandeursKeys', async function () {
        getGrandeursKeys().should.deep.equal([
            "Dens",
            "Duré",
            "Ener",
            "Long",
            "Mass",
            "Nomb",
            "Prix",
            "Surf",
            "Volu"
        ]);
    });

    it('getGrandeur ok', function(){
        getGrandeur("Dens").should.deep.equal({
            "key": "Dens",
            "label": "Densité (mol, mmol...)",
            "units": [
                {
                    "coef": 0.000001,
                    "grandeur": "Dens",
                    "name": "micro-mole",
                    "shortname": "μmol"
                },
                {
                    "coef": 0.001,
                    "grandeur": "Dens",
                    "name": "milli-mole",
                    "shortname": "mmol"
                },
                {
                    "coef": 1,
                    "grandeur": "Dens",
                    "name": "mole",
                    "shortname": "mol"
                }
            ]
        });
    });
    it('getGrandeur null', function(){
        (!getGrandeur("sdlfgij")).should.be.true;
    });

    it('getUnits', async function () {
        getUnits().should.deep.equal({
            "J": {
                "coef": 0.23923445,
                "grandeur": "Ener",
                "name": "joule",
                "shortname": "J",
            },
            "L": {
                "coef": 0.001,
                "grandeur": "Volu",
                "name": "litre",
                "shortname": "L",
            },
            "Mcal": {
                "coef": 1000000,
                "grandeur": "Ener",
                "name": "mega-calorie",
                "shortname": "Mcal",
            },
            "Mt": {
                "coef": 1000000000,
                "grandeur": "Mass",
                "name": "mega-tonne",
                "shortname": "Mt",
            },
            "an": {
                "coef": 11041920000,
                "grandeur": "Duré",
                "name": "année",
                "shortname": "an",
            },
            "cal": {
                "coef": 1,
                "grandeur": "Ener",
                "name": "calorie",
                "shortname": "cal",
            },
            "cm": {
                "coef": 0.01,
                "grandeur": "Long",
                "name": "centimètre",
                "shortname": "cm",
            },
            "count": {
                "coef": 1,
                "grandeur": "Nomb",
                "name": "",
                "shortname": "count",
            },
            "g": {
                "coef": 1,
                "grandeur": "Mass",
                "name": "gramme",
                "shortname": "g",
            },
            "goutte": {
                "coef": 20,
                "grandeur": "Volu",
                "name": "goutte",
                "shortname": "goutte",
            },
            "h": {
                "coef": 3600,
                "grandeur": "Duré",
                "name": "heure",
                "shortname": "h",
            },
            "hec": {
                "coef": 10000,
                "grandeur": "Surf",
                "name": "hectare",
                "shortname": "hec",
            },
            "j": {
                "coef": 86400,
                "grandeur": "Duré",
                "name": "jour",
                "shortname": "j",
            },
            "kcal": {
                "coef": 1000,
                "grandeur": "Ener",
                "name": "kilo-calorie",
                "shortname": "kcal",
            },
            "kg": {
                "coef": 1000,
                "grandeur": "Mass",
                "name": "kilogramme",
                "shortname": "kg",
            },
            "km": {
                "coef": 1000,
                "grandeur": "Long",
                "name": "kilomètre",
                "shortname": "km",
            },
            "kwh": {
                "coef": 861244.02,
                "grandeur": "Ener",
                "name": "Watt-Heure",
                "shortname": "kwh",
            },
            "m": {
                "coef": 1,
                "grandeur": "Long",
                "name": "mètre",
                "shortname": "m",
            },
            "m2": {
                "coef": 1,
                "grandeur": "Surf",
                "name": "mètre-carré",
                "shortname": "m2",
            },
            "m3": {
                "coef": 1,
                "grandeur": "Volu",
                "name": "mètre-cube",
                "shortname": "m3",
            },
            "mg": {
                "coef": 0.001,
                "grandeur": "Mass",
                "name": "milligramme",
                "shortname": "mg",
            },
            "min": {
                "coef": 60,
                "grandeur": "Duré",
                "name": "minute",
                "shortname": "min",
            },
            "mm": {
                "coef": 0.001,
                "grandeur": "Long",
                "name": "millimètre",
                "shortname": "mm",
            },
            "mmol": {
                "coef": 0.001,
                "grandeur": "Dens",
                "name": "milli-mole",
                "shortname": "mmol",
            },
            "mois": {
                "coef": 920160000,
                "grandeur": "Duré",
                "name": "mois",
                "shortname": "mois",
            },
            "mol": {
                "coef": 1,
                "grandeur": "Dens",
                "name": "mole",
                "shortname": "mol",
            },
            "sec": {
                "coef": 1,
                "grandeur": "Duré",
                "name": "seconde",
                "shortname": "sec",
            },
            "t": {
                "coef": 1000000,
                "grandeur": "Mass",
                "name": "tonne",
                "shortname": "t",
            },
            "wh": {
                "coef": 861.24402,
                "grandeur": "Ener",
                "name": "Watt-Heure",
                "shortname": "wh",
            },
            "ws": {
                "coef": 0.23923445,
                "grandeur": "Ener",
                "name": "Watt-Seconde",
                "shortname": "ws",
            },
            "μmol": {
                "coef": 0.000001,
                "grandeur": "Dens",
                "name": "micro-mole",
                "shortname": "μmol",
            },
            "€": {
                "coef": 1,
                "grandeur": "Prix",
                "name": "euro",
                "shortname": "€",
            }
        });
    });

});