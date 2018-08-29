import {expect} from 'chai'
import {mockGrandeurs} from "../grandeurServiceMock"
import {bestQuantity, coef, grandeur, qtUnitCoef, toBaseQuantity, unit, unitCoef, grandeurFromShortname, sameGrandeur, changeUnit, bqtGToQtUnit} from "../../src/index"
import {bestRound, toBqtG} from "../../src"
import chai from "chai"

chai.should()

beforeEach(async () => {
    await mockGrandeurs()
})

describe('TU Grandeurs', function () {

    describe('bqtGToQtUnit', function () {
        it('1 Mass 1 kg', function () {
            expect(bqtGToQtUnit({bqt: 1, g: "Mass"})).to.deep.equal({qt: 1, unit: "kg"})
        })
        it('0.001 Mass 0.001 g', function () {
            expect(bqtGToQtUnit({bqt: "0.001", g: "Volu"})).to.deep.equal({qt: "0.001", unit: "m3"})
        })
    })
    
    describe('sameGrandeur', function () {
        it('m m ok', function () {
            expect(sameGrandeur("m", "m")).to.be.true
        })
        it('m km ok', function () {
            expect(sameGrandeur("m", "km")).to.be.true
        })
        it('m L ko', function () {
            expect(sameGrandeur("m", "L")).to.be.false
        })
    })
    
    describe('grandeur', function () {
        it('kg ok', function () {
            expect(grandeur("kg")).to.equal("Mass")
        })
        it('zz null', function () {
            expect(grandeur("zz")).to.be.null
        })
    })
    
    describe('unit', function () {
        it('m ok', function () {
            expect(unitCoef('m', 'm')).to.equal(1)
        })
        it('"" ok', function () {
            expect(unitCoef('Nomb', 'Nomb')).to.equal(1)
        })
        it('unit("doudou") throws error', function () {
            expect(unit('doudou')).to.be.null
        })
    })
    
    describe('unitCoef', function () {
        it('m m == 1', function () {
            expect(unitCoef('m', 'm')).to.equal(1)
        })
        it('km km == 1', function () {
            expect(unitCoef('km', 'km')).to.equal(1)
        })
        it('km m == 1000', function () {
            expect(unitCoef('km', 'm')).to.equal(1000)
        })
        it('m km == 0.001', function () {
            expect(unitCoef('m', 'km')).to.equal(0.001)
        })
        it('sec km is undefined', function () {
            expect(unitCoef('sec', 'km')).to.equal(undefined)
        })
    })
    
    describe('qtUnitCoef', function () {
        it('1kg 1kg == 1', function () {
            expect(qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1, unit: "kg"})).to.equal(1)
        })
        
        it('2kg 1kg == 2', function () {
            expect(qtUnitCoef({qt: 2, unit: "kg"}, {qt: 1, unit: "kg"})).to.equal(2)
        })
        it('2kg 4kg == 0.5', function () {
            expect(qtUnitCoef({qt: 2, unit: "kg"}, {qt: 4, unit: "kg"})).to.equal(0.5)
        })
        it('1L 1mL == 1000', function () {
            expect(qtUnitCoef({qt: 1, unit: "L"}, {qt: 1, unit: "mL"})).to.equal(1000)
        })
        it('1L 1000mL == 1', function () {
            expect(qtUnitCoef({qt: 1, unit: "L"}, {qt: 1000, unit: "mL"})).to.equal(1)
        })
        it('1000g 1kg == 1', function () {
            expect(qtUnitCoef({qt: 1000, unit: "g"}, {qt: 1, unit: "kg"})).to.equal(1)
        })
        it('1kg 1000g == 1', function () {
            expect(qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1000, unit: "g"})).to.equal(1)
        })
        
        it('1g 1kg == 0.001', function () {
            expect(qtUnitCoef({qt: 1, unit: "g"}, {qt: 1, unit: "kg"})).to.equal(0.001)
        })
        it('1kg 1g == 1000', function () {
            expect(qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1, unit: "g"})).to.equal(1000)
        })
        
    })
    
    describe('coef', function () {
        it('kg => 1', function () {
            expect(coef("kg")).to.equal(1)
        })
        it('g => 0.001', function () {
            expect(coef("g")).to.equal(0.001)
        })
        it('"count" => 1', function () {
            expect(coef("Nomb")).to.equal(1)
        })
    })
    
    describe('toBaseQuantity', function () {
        it('10t => 10000kg', function () {
            expect(toBaseQuantity({qt: 10, unit: "t"})).to.deep.equal({qt: 10000, unit: "kg"})
        })
        it('10.5t => 10500kg', function () {
            expect(toBaseQuantity({qt: 10, unit: "t"})).to.deep.equal({qt: 10000, unit: "kg"})
        })
        it('10kg => 10kg', function () {
            expect(toBaseQuantity({qt: 10, unit: "kg"})).to.deep.equal({qt: 10, unit: "kg"})
        })
    })
    
    describe('toBqtG', function () {
        it('10t => 10000 Mass', function () {
            expect(toBqtG({qt: 10, unit: "t"})).to.deep.equal({bqt: 10000, g: "Mass"})
        })
        it('10.5t => 10500 Mass', function () {
            expect(toBqtG({qt: 10, unit: "t"})).to.deep.equal({bqt: 10000, g: "Mass"})
        })
        it('10kg => 10 Mass', function () {
            expect(toBqtG({qt: 10, unit: "kg"})).to.deep.equal({bqt: 10, g: "Mass"})
        })
        it('0.01kg => 0.01 Mass', function () {
            expect(toBqtG({qt: 0.01, unit: "kg"})).to.deep.equal({bqt: 0.01, g: "Mass"})
        })
    })
    
    describe('unitsFromShortname', function () {
        it('kg ok', function () {
            expect(grandeurFromShortname("kg").key).to.equal("Mass")
        })
        it('zz ok', function () {
            expect(grandeurFromShortname("zz")).to.be.null
        })
    })

    describe('best round', function () {
        it('999 999', function () {
            bestRound(999).should.equal(999)
        })
        it('999.1 999', function () {
            bestRound(999.1).should.equal(999)
        })
        it('999.6 1000', function () {
            bestRound(999.6).should.equal(1000)
        })
        it('99.61 99.9', function () {
            bestRound(99.91).should.equal(99.9)
        })
        it('9.991 9.99', function () {
            bestRound(9.991).should.equal(9.99)
        })
        it('0.9991 0.999', function () {
            bestRound(0.9991).should.equal(0.999)
        })
        it('0.1 0.1', function () {
            bestRound(0.1).should.equal(0.1)
        })
        it('0.01 0.01', function () {
            bestRound(0.01).should.equal(0.01)
        })
        it('0.001 0.001', function () {
            bestRound(0.001).should.equal(0.001)
        })
        it('0.0001 0.0001', function () {
            bestRound(0.0001).should.equal(0.0001)
        })
        it('0.000000001 0.000000001', function () {
            bestRound(0.000000001).should.equal(0.000000001)
        })
    })
    
    describe('bestQuantity', function () {
        it('2.42883e-11 g => 2.43e-11 g', function () {
            expect(bestQuantity({qt: 2.42883e-11, unit: "g"})).to.deep.equal({qt: 2.43e-8, unit: "mg"})
        })
        it('-1189710 mg => -1.19kg', function () {
            expect(bestQuantity({qt: -1189710, unit: "mg"})).to.deep.equal({qt: -1.19, unit: "kg"})
        })
        it('0.003 kg => 1 g', function () {
            expect(bestQuantity({qt: 0.003, unit: "kg"})).to.deep.equal({qt: 3, unit: "g"})
        })
        it('0.001 kg => 1 g', function () {
            expect(bestQuantity({qt: 0.001, unit: "kg"})).to.deep.equal({qt: 1, unit: "g"})
        })
        it('0.001 m3 => 1 L', function () {
            expect(bestQuantity({qt: 0.001, unit: "m3"})).to.deep.equal({qt: 1, unit: "L"})
        })
        it('5.0245 € => 5.02 €', function () {
            expect(bestQuantity({qt: 5.0245, unit: "€"})).to.deep.equal({qt: 5.02, unit: "€"})
        })
        it('1 Nomb => 1 Nomb', function () {
            expect(bestQuantity({qt: 1, unit: "Nomb"})).to.deep.equal({qt: 1, unit: "Nomb"})
        })
        it('500uio => null', function () {
            expect(bestQuantity({qt: 500, unit: "uio"})).to.deep.equal({qt: 500, unit: "uio!"})
        })
        it('500mg => 500mg', function () {
            expect(bestQuantity({qt: 500, unit: "mg"})).to.deep.equal({qt: 0.5, unit: "g"})
        })
        it('1000mg => 1g', function () {
            expect(bestQuantity({qt: 1000, unit: "mg"})).to.deep.equal({qt: 1, unit: "g"})
        })
        it('1000000mg => 1kg', function () {
            expect(bestQuantity({qt: 1000000, unit: "mg"})).to.deep.equal({qt: 1, unit: "kg"})
        })
        it('1000000000mg => 1t', function () {
            expect(bestQuantity({qt: 1000000000, unit: "mg"})).to.deep.equal({qt: 1, unit: "t"})
        })
        it('1111111111mg => 1.11t', function () {
            expect(bestQuantity({qt: 1111111111, unit: "mg"})).to.deep.equal({qt: 1.11, unit: "t"})
        })
        it('1990000000mg => 2t', function () {
            expect(bestQuantity({qt: 1990000000, unit: "mg"})).to.deep.equal({qt: 1.99, unit: "t"})
        })
        it('1999999999mg => 2t', function () {
            expect(bestQuantity({qt: 1999999999, unit: "mg"})).to.deep.equal({qt: 2, unit: "t"})
        })
        it('0.51m3 => ', function () {
            expect(bestQuantity({qt: 0.51, unit: "m3"})).to.deep.equal({qt: 510, unit: "L"})
        })
        it('0.001g => 1mg', function () {
            expect(bestQuantity({qt: 0.001, unit: "g"})).to.deep.equal({qt: 1, unit: "mg"})
        })
        it('0.0001g => 0.1mg', function () {
            expect(bestQuantity({qt: 0.0001, unit: "g"})).to.deep.equal({qt: 0.1, unit: "mg"})
        })
        it('1g => 1g', function () {
            expect(bestQuantity({qt: 1, unit: "g"})).to.deep.equal({qt: 1, unit: "g"})
        })
        it('50g => 50g', function () {
            expect(bestQuantity({qt: 50, unit: "g"})).to.deep.equal({qt: 50, unit: "g"})
        })
        it('500g => 500g', function () {
            expect(bestQuantity({qt: 500, unit: "g"})).to.deep.equal({qt: 0.5, unit: "kg"})
        })
        it('999g => 999g', function () {
            expect(bestQuantity({qt: 999, unit: "g"})).to.deep.equal({qt: 999, unit: "g"})
        })
        it('1000g => 1kg', function () {
            expect(bestQuantity({qt: 1000, unit: "g"})).to.deep.equal({qt: 1, unit: "kg"})
        })
        it('5000g => 5kg', function () {
            expect(bestQuantity({qt: 5000, unit: "g"})).to.deep.equal({qt: 5, unit: "kg"})
        })
        it('1010g => 1.01kg', function () {
            expect(bestQuantity({qt: 1010, unit: "g"})).to.deep.equal({qt: 1.01, unit: "kg"})
        })
        it('2010g => 2.01kg', function () {
            expect(bestQuantity({qt: 2010, unit: "g"})).to.deep.equal({qt: 2.01, unit: "kg"})
        })
        it('0.0000001kg => 0.1mg', function () {
            expect(bestQuantity({qt: 0.0000001, unit: "kg"})).to.deep.equal({qt: 0.1, unit: "mg"})
        })
    })
    
    describe('change unit', function () {
        it('10t kg => 10000', function () {
            expect(changeUnit({qt: 10, unit: "t"}, "kg")).to.equal(10000)
        })
        it('0.001t kg => 1', function () {
            expect(changeUnit({qt: 0.001, unit: "t"}, "kg")).to.equal(1)
        })
        it('1kg kg => 1', function () {
            expect(changeUnit({qt: 1, unit: "kg"}, "kg")).to.equal(1)
        })
    })
    
})