import chai from 'chai';
import {getGrandeursKeys, getShortnames} from "../../src/index";
import {mockGrandeurs} from "../mock";

chai.should();

beforeEach(async () => {
    await mockGrandeurs();
});

describe('TU Init', function () {

    it('getShortnames ok', async function () {
        getShortnames().should.deep.equal([
            "J",
            "ws",
            "cal",
            "wh",
            "kwh",
            "kcal",
            "Mcal",
            "μmol",
            "mmol",
            "mol",
            "count",
            "m3",
            "L",
            "goutte",
            "sec",
            "min",
            "h",
            "j",
            "mois",
            "an",
            "mg",
            "g",
            "kg",
            "t",
            "Mt",
            "m2",
            "hec",
            "mm",
            "cm",
            "m",
            "km",
            "€",
        ]);
    });

    it('getGrandeursKeys', async function () {
        getGrandeursKeys().should.deep.equal([
            "Ener",
            "Dens",
            "Nomb",
            "Volu",
            "Duré",
            "Mass",
            "Surf",
            "Long",
            "Prix",
        ]);
    });

});