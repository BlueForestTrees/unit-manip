import chai from 'chai'
import {getGrandeursKeys, getShortnames, getUnits, getGrandeur, getGrandeurs} from "../../src/index"
import {mockGrandeurs} from "../grandeurServiceMock"

chai.should()

beforeEach(async () => {
    await mockGrandeurs()
})

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
            "kWh",
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
            "Nomb",
            "Item(s)",
            "€",
            "k€",
            "m€",
            "M€",
            "$",
            "k$",
            "M$",
            "m$",
            "m2",
            "hec",
            "kg*km",
            "t*km",
            "mL",
            "cL",
            "dL",
            "L",
            "m3",
            "goutte"
        ])
    })
    
    it('getGrandeursKeys', async function () {
        getGrandeursKeys().should.deep.equal([
            "Dens",
            "Duré",
            "Ener",
            "Long",
            "Mass",
            "Nomb",
            "Pri1",
            "Pri2",
            "Surf",
            "Tran",
            "Volu"
        ])
    })
    
    it('getGrandeur ok', function () {
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
        })
    })
    it('getGrandeur null', function () {
        (!getGrandeur("sdlfgij")).should.be.true
    })
    
    it('getUnits', async function () {
        Object.keys(getUnits()).length.should.equal(45)
    })
    
    it('getGrandeurs', function () {
        getGrandeurs().map(g => g.key).should.deep.equal(["Dens", "Duré", "Ener", "Long", "Mass", "Nomb",  "Pri1", "Pri2", "Surf", "Tran", "Volu"])
    })
    
})