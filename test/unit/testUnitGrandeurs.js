import {expect} from 'chai';
import {mockGrandeurs} from "../grandeurServiceMock";
import {bestQuantity, coef, grandeur, qtUnitCoef, toBaseQuantity, unit, unitCoef, grandeurFromShortname, sameGrandeur, changeUnit, bqtGToQtUnit} from "../../src/index"
import {toBqtG} from "../../src"

beforeEach(async () => {
    await mockGrandeurs();
});

describe('TU Grandeurs', function () {
    
    describe('bqtGToQtUnit', function(){
        it('1 Mass 1 g', function(){
            expect(bqtGToQtUnit({bqt:1, g:"Mass"})).to.deep.equal({qt:1, unit:"g"})
        })
    })

    describe('sameGrandeur', function () {
        it('m m ok', function () {
            expect(sameGrandeur("m", "m")).to.be.true;
        });
        it('m km ok', function () {
            expect(sameGrandeur("m", "km")).to.be.true;
        });
        it('m L ko', function () {
            expect(sameGrandeur("m", "L")).to.be.false;
        })
    });

    describe('grandeur', function () {
        it('kg ok', function () {
            expect(grandeur("kg")).to.equal("Mass");
        });
        it('zz null', function () {
            expect(grandeur("zz")).to.be.null;
        });
    });

    describe('unit', function () {
        it('m ok', function () {
            expect(unitCoef('m', 'm')).to.equal(1);
        });
        it('"" ok', function () {
            expect(unitCoef('Nomb', 'Nomb')).to.equal(1);
        });
        it('unit("doudou") throws error', function () {
            expect(unit('doudou')).to.be.null;
        });
    });

    describe('unitCoef', function () {
        it('m m == 1', function () {
            expect(unitCoef('m', 'm')).to.equal(1);
        });
        it('km km == 1', function () {
            expect(unitCoef('km', 'km')).to.equal(1);
        });
        it('km m == 1000', function () {
            expect(unitCoef('km', 'm')).to.equal(1000);
        });
        it('m km == 0.001', function () {
            expect(unitCoef('m', 'km')).to.equal(0.001);
        });
        it('sec km is undefined', function () {
            expect(unitCoef('sec', 'km')).to.equal(undefined);
        });
    });

    describe('qtUnitCoef', function () {
        it('1kg 1kg == 1', function () {
            expect(qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1, unit: "kg"})).to.equal(1);
        });

        it('2kg 1kg == 2', function () {
            expect(qtUnitCoef({qt: 2, unit: "kg"}, {qt: 1, unit: "kg"})).to.equal(2);
        });
        it('2kg 4kg == 0.5', function () {
            expect(qtUnitCoef({qt: 2, unit: "kg"}, {qt: 4, unit: "kg"})).to.equal(0.5);
        });
        it('1L 1mL == 1000', function () {
            expect(qtUnitCoef({qt: 1, unit: "L"}, {qt: 1, unit: "mL"})).to.equal(1000);
        });
        it('1L 1000mL == 1', function () {
            expect(qtUnitCoef({qt: 1, unit: "L"}, {qt: 1000, unit: "mL"})).to.equal(1);
        });
        it('1000g 1kg == 1', function () {
            expect(qtUnitCoef({qt: 1000, unit: "g"}, {qt: 1, unit: "kg"})).to.equal(1);
        });
        it('1kg 1000g == 1', function () {
            expect(qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1000, unit: "g"})).to.equal(1);
        });

        it('1g 1kg == 0.001', function () {
            expect(qtUnitCoef({qt: 1, unit: "g"}, {qt: 1, unit: "kg"})).to.equal(0.001);
        });
        it('1kg 1g == 1000', function () {
            expect(qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1, unit: "g"})).to.equal(1000);
        });

    });

    describe('coef', function () {
        it('kg => 1000', function () {
            expect(coef("kg")).to.equal(1000);
        });
        it('g => 1', function () {
            expect(coef("g")).to.equal(1);
        });
        it('"count" => 1', function () {
            expect(coef("Nomb")).to.equal(1);
        });
    });

    describe('toBqtG', function () {
        it('10kg => 10000g', function () {
            expect(toBaseQuantity({qt: 10, unit: "kg"})).to.deep.equal({qt: 10000, unit: "g"});
        });
        it('10.5kg => 10500g', function () {
            expect(toBaseQuantity({qt: 10, unit: "kg"})).to.deep.equal({qt: 10000, unit: "g"});
        });
        it('10g => 10g', function () {
            expect(toBaseQuantity({qt: 10, unit: "g"})).to.deep.equal({qt: 10, unit: "g"});
        });
    });

    describe('toBqtG', function () {
        it('10kg => 10000 Mass', function () {
            expect(toBqtG({qt: 10, unit: "kg"})).to.deep.equal({bqt: 10000, g: "Mass"});
        });
        it('10.5kg => 10500 Mass', function () {
            expect(toBqtG({qt: 10, unit: "kg"})).to.deep.equal({bqt: 10000, g: "Mass"});
        });
        it('10g => 10 Mass', function () {
            expect(toBqtG({qt: 10, unit: "g"})).to.deep.equal({bqt: 10, g: "Mass"});
        });
    });

    describe('unitsFromShortname', function () {
        it('kg ok', function () {
            expect(grandeurFromShortname("kg").key).to.equal("Mass");
        });
        it('zz ok', function () {
            expect(grandeurFromShortname("zz")).to.be.null;
        });
    });

    describe('best quantity Masse', function () {
        it('1 Nomb => 1 Nomb', function(){
            expect(bestQuantity({qt: 1, unit: "Nomb"})).to.deep.equal({qt: 1, unit: "Nomb"});
        })
        it('1 Item => 1 Item', function(){
            expect(bestQuantity({qt: 1, unit: "Item(s)"})).to.deep.equal({qt: 1, unit: "Item(s)"});
        })
        it('500uio => null', function () {
            expect(bestQuantity({qt: 500, unit: "uio"})).to.deep.equal({qt: 500, unit: "uio!"});
        });
        it('500mg => 500mg', function () {
            expect(bestQuantity({qt: 500, unit: "mg"})).to.deep.equal({qt: 500, unit: "mg"});
        });
        it('1000mg => 1g', function () {
            expect(bestQuantity({qt: 1000, unit: "mg"})).to.deep.equal({qt: 1, unit: "g"});
        });
        it('1000000mg => 1kg', function () {
            expect(bestQuantity({qt: 1000000, unit: "mg"})).to.deep.equal({qt: 1, unit: "kg"});
        });
        it('1000000000mg => 1t', function () {
            expect(bestQuantity({qt: 1000000000, unit: "mg"})).to.deep.equal({qt: 1, unit: "t"});
        });
        it('1111111111mg => 1.11t', function () {
            expect(bestQuantity({qt: 1111111111, unit: "mg"})).to.deep.equal({qt: 1.11, unit: "t"});
        });
        it('1990000000mg => 2t', function () {
            expect(bestQuantity({qt: 1990000000, unit: "mg"})).to.deep.equal({qt: 1.99, unit: "t"});
        });
        it('1999999999mg => 2t', function () {
            expect(bestQuantity({qt: 1999999999, unit: "mg"})).to.deep.equal({qt: 2, unit: "t"});
        });
        it('0.51m3 => ', function () {
            expect(bestQuantity({qt: 0.51, unit: "m3"})).to.deep.equal({qt: 0.51, unit: "m3"});
        });
        it('0.001g => 1mg', function () {
            expect(bestQuantity({qt: 0.001, unit: "g"})).to.deep.equal({qt: 1, unit: "mg"});
        });
        it('0.003g => 3mg', function () {
            expect(bestQuantity({qt: 0.003, unit: "g"})).to.deep.equal({qt: 3, unit: "mg"});
        });
        it('0.0001g => 0.1mg', function () {
            expect(bestQuantity({qt: 0.0001, unit: "g"})).to.deep.equal({qt: 0.1, unit: "mg"});
        });
        it('1g => 1g', function () {
            expect(bestQuantity({qt: 1, unit: "g"})).to.deep.equal({qt: 1, unit: "g"});
        });
        it('500g => 500g', function () {
            expect(bestQuantity({qt: 500, unit: "g"})).to.deep.equal({qt: 500, unit: "g"});
        });
        it('999g => 999g', function () {
            expect(bestQuantity({qt: 999, unit: "g"})).to.deep.equal({qt: 999, unit: "g"});
        });
        it('1000g => 1kg', function () {
            expect(bestQuantity({qt: 1000, unit: "g"})).to.deep.equal({qt: 1, unit: "kg"});
        });
        it('5000g => 5kg', function () {
            expect(bestQuantity({qt: 5000, unit: "g"})).to.deep.equal({qt: 5, unit: "kg"});
        });
        it('1010g => 1.01kg', function () {
            expect(bestQuantity({qt: 1010, unit: "g"})).to.deep.equal({qt: 1.01, unit: "kg"});
        });
        it('2010g => 2.01kg', function () {
            expect(bestQuantity({qt: 2010, unit: "g"})).to.deep.equal({qt: 2.01, unit: "kg"});
        });
        it('0.0000001kg => 0.1mg', function () {
            expect(bestQuantity({qt: 0.0000001, unit: "kg"})).to.deep.equal({qt: 0.1, unit: "mg"});
        });
    });

    describe('change unit', function(){
        it('10t kg => 10000', function(){
            expect(changeUnit({qt:10,unit:"t"},"kg")).to.equal(10000);
        })
        it('0.001t kg => 1', function(){
            expect(changeUnit({qt:0.001,unit:"t"},"kg")).to.equal(1);
        })
        it('1kg kg => 1', function(){
            expect(changeUnit({qt:1,unit:"kg"},"kg")).to.equal(1);
        })
    })

});