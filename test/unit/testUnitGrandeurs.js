const expect = require ('chai').expect
const mock = require("../grandeurServiceMock")

const unitManip = require("../../src")
const chai = require("chai")

chai.should()

beforeEach(function() {
    return mock.mockGrandeurs()
})

describe('TU Grandeurs', function () {
    
    describe('best round', function () {
        it('-2 -2', function () {
            unitManip.bestRound(-2).should.equal(-2)
        })
        it('999 999', function () {
            unitManip.bestRound(999).should.equal(999)
        })
        it('999.1 999', function () {
            unitManip.bestRound(999.1).should.equal(999)
        })
        it('999.6 1000', function () {
            unitManip.bestRound(999.6).should.equal(1000)
        })
        it('99.61 99.9', function () {
            unitManip.bestRound(99.91).should.equal(99.9)
        })
        it('9.991 9.99', function () {
            unitManip.bestRound(9.991).should.equal(9.99)
        })
        it('0.9991 0.999', function () {
            unitManip.bestRound(0.9991).should.equal(0.999)
        })
    })
    
    describe('bqtGToQtUnit', function () {
        it('1 Mass 1 g', function () {
            expect(unitManip.bqtGToQtUnit({bqt: 1, g: "Mass"})).to.deep.equal({qt: 1, unit: "g"})
        })
        it('0.001 Mass 0.001 g', function () {
            expect(unitManip.bqtGToQtUnit({bqt: "0.001", g: "Volu"})).to.deep.equal({qt: "0.001", unit: "m3"})
        })
    })
    
    describe('sameGrandeur', function () {
        it('m m ok', function () {
            expect(unitManip.sameGrandeur("m", "m")).to.be.true
        })
        it('m km ok', function () {
            expect(unitManip.sameGrandeur("m", "km")).to.be.true
        })
        it('m L ko', function () {
            expect(unitManip.sameGrandeur("m", "L")).to.be.false
        })
    })
    
    describe('grandeur', function () {
        it('kg ok', function () {
            expect(unitManip.grandeur("kg")).to.equal("Mass")
        })
        it('zz null', function () {
            expect(unitManip.grandeur("zz")).to.be.null
        })
    })
    
    describe('unit', function () {
        it('m ok', function () {
            expect(unitManip.unitCoef('m', 'm')).to.equal(1)
        })
        it('"" ok', function () {
            expect(unitManip.unitCoef('Nomb', 'Nomb')).to.equal(1)
        })
        it('unit("doudou") throws error', function () {
            expect(unitManip.unit('doudou')).to.be.null
        })
    })
    
    describe('unitCoef', function () {
        it('m m == 1', function () {
            expect(unitManip.unitCoef('m', 'm')).to.equal(1)
        })
        it('km km == 1', function () {
            expect(unitManip.unitCoef('km', 'km')).to.equal(1)
        })
        it('km m == 1000', function () {
            expect(unitManip.unitCoef('km', 'm')).to.equal(1000)
        })
        it('m km == 0.001', function () {
            expect(unitManip.unitCoef('m', 'km')).to.equal(0.001)
        })
        it('sec km is undefined', function () {
            expect(unitManip.unitCoef('sec', 'km')).to.equal(undefined)
        })
    })
    
    describe('qtUnitCoef', function () {
        it('1kg 1kg == 1', function () {
            expect(unitManip.qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1, unit: "kg"})).to.equal(1)
        })
        
        it('2kg 1kg == 2', function () {
            expect(unitManip.qtUnitCoef({qt: 2, unit: "kg"}, {qt: 1, unit: "kg"})).to.equal(2)
        })
        it('2kg 4kg == 0.5', function () {
            expect(unitManip.qtUnitCoef({qt: 2, unit: "kg"}, {qt: 4, unit: "kg"})).to.equal(0.5)
        })
        it('1L 1mL == 1000', function () {
            expect(unitManip.qtUnitCoef({qt: 1, unit: "L"}, {qt: 1, unit: "mL"})).to.equal(1000)
        })
        it('1L 1000mL == 1', function () {
            expect(unitManip.qtUnitCoef({qt: 1, unit: "L"}, {qt: 1000, unit: "mL"})).to.equal(1)
        })
        it('1000g 1kg == 1', function () {
            expect(unitManip.qtUnitCoef({qt: 1000, unit: "g"}, {qt: 1, unit: "kg"})).to.equal(1)
        })
        it('1kg 1000g == 1', function () {
            expect(unitManip.qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1000, unit: "g"})).to.equal(1)
        })
        
        it('1g 1kg == 0.001', function () {
            expect(unitManip.qtUnitCoef({qt: 1, unit: "g"}, {qt: 1, unit: "kg"})).to.equal(0.001)
        })
        it('1kg 1g == 1000', function () {
            expect(unitManip.qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1, unit: "g"})).to.equal(1000)
        })
        
    })
    
    describe('coef', function () {
        it('kg => 1000', function () {
            expect(unitManip.coef("kg")).to.equal(1000)
        })
        it('g => 1', function () {
            expect(unitManip.coef("g")).to.equal(1)
        })
        it('"count" => 1', function () {
            expect(unitManip.coef("Nomb")).to.equal(1)
        })
    })
    
    describe('toBaseQuantity', function () {
        it('10kg => 10000g', function () {
            expect(unitManip.toBaseQuantity({qt: 10, unit: "kg"})).to.deep.equal({qt: 10000, unit: "g"})
        })
        it('10.5kg => 10500g', function () {
            expect(unitManip.toBaseQuantity({qt: 10, unit: "kg"})).to.deep.equal({qt: 10000, unit: "g"})
        })
        it('10g => 10g', function () {
            expect(unitManip.toBaseQuantity({qt: 10, unit: "g"})).to.deep.equal({qt: 10, unit: "g"})
        })
    })
    
    describe('toBqtG', function () {
        it('10kg => 10000 Mass', function () {
            expect(unitManip.toBqtG({qt: 10, unit: "kg"})).to.deep.equal({bqt: 10000, g: "Mass"})
        })
        it('10.5kg => 10500 Mass', function () {
            expect(unitManip.toBqtG({qt: 10, unit: "kg"})).to.deep.equal({bqt: 10000, g: "Mass"})
        })
        it('10g => 10 Mass', function () {
            expect(unitManip.toBqtG({qt: 10, unit: "g"})).to.deep.equal({bqt: 10, g: "Mass"})
        })
    })
    
    describe('unitsFromShortname', function () {
        it('kg ok', function () {
            expect(unitManip.grandeurFromShortname("kg").key).to.equal("Mass")
        })
        it('zz ok', function () {
            expect(unitManip.grandeurFromShortname("zz")).to.be.null
        })
    })
    
    describe('bestQuantity', function () {
        it('0.001 m3 => ?', function () {
            expect(unitManip.bestQuantity({qt: 0.001, unit: "m3"})).to.deep.equal({qt: 1, unit: "L"})
        })
        it('5.0245 € => 5.0245 €', function () {
            expect(unitManip.bestQuantity({qt: 5.0245, unit: "€"})).to.deep.equal({qt: 5.02, unit: "€"})
        })
        it('1 Nomb => 1 Nomb', function () {
            expect(unitManip.bestQuantity({qt: 1, unit: "Nomb"})).to.deep.equal({qt: 1, unit: "Nomb"})
        })
        it('1 Item => 1 Item', function () {
            expect(unitManip.bestQuantity({qt: 1, unit: "Item(s)"})).to.deep.equal({qt: 1, unit: "Item(s)"})
        })
        it('500uio => null', function () {
            expect(unitManip.bestQuantity({qt: 500, unit: "uio"})).to.deep.equal({qt: 500, unit: "uio!"})
        })
        it('500mg => 500mg', function () {
            expect(unitManip.bestQuantity({qt: 500, unit: "mg"})).to.deep.equal({qt: 500, unit: "mg"})
        })
        it('1000mg => 1g', function () {
            expect(unitManip.bestQuantity({qt: 1000, unit: "mg"})).to.deep.equal({qt: 1, unit: "g"})
        })
        it('1000000mg => 1kg', function () {
            expect(unitManip.bestQuantity({qt: 1000000, unit: "mg"})).to.deep.equal({qt: 1, unit: "kg"})
        })
        it('1000000000mg => 1t', function () {
            expect(unitManip.bestQuantity({qt: 1000000000, unit: "mg"})).to.deep.equal({qt: 1, unit: "t"})
        })
        it('1111111111mg => 1.11t', function () {
            expect(unitManip.bestQuantity({qt: 1111111111, unit: "mg"})).to.deep.equal({qt: 1.11, unit: "t"})
        })
        it('1990000000mg => 2t', function () {
            expect(unitManip.bestQuantity({qt: 1990000000, unit: "mg"})).to.deep.equal({qt: 1.99, unit: "t"})
        })
        it('1999999999mg => 2t', function () {
            expect(unitManip.bestQuantity({qt: 1999999999, unit: "mg"})).to.deep.equal({qt: 2, unit: "t"})
        })
        it('0.51m3 => ', function () {
            expect(unitManip.bestQuantity({qt: 0.51, unit: "m3"})).to.deep.equal({qt: 0.51, unit: "m3"})
        })
        it('0.001g => 1mg', function () {
            expect(unitManip.bestQuantity({qt: 0.001, unit: "g"})).to.deep.equal({qt: 1, unit: "mg"})
        })
        // it('0.003g => 3mg', function () {
        //     expect(unitManip.bestQuantity({qt: 0.003, unit: "g"})).to.deep.equal({qt: 3, unit: "mg"})
        // })
        it('0.0001g => 0.1mg', function () {
            expect(unitManip.bestQuantity({qt: 0.0001, unit: "g"})).to.deep.equal({qt: 0.1, unit: "mg"})
        })
        it('1g => 1g', function () {
            expect(unitManip.bestQuantity({qt: 1, unit: "g"})).to.deep.equal({qt: 1, unit: "g"})
        })
        it('500g => 500g', function () {
            expect(unitManip.bestQuantity({qt: 500, unit: "g"})).to.deep.equal({qt: 500, unit: "g"})
        })
        it('999g => 999g', function () {
            expect(unitManip.bestQuantity({qt: 999, unit: "g"})).to.deep.equal({qt: 999, unit: "g"})
        })
        it('1000g => 1kg', function () {
            expect(unitManip.bestQuantity({qt: 1000, unit: "g"})).to.deep.equal({qt: 1, unit: "kg"})
        })
        it('5000g => 5kg', function () {
            expect(unitManip.bestQuantity({qt: 5000, unit: "g"})).to.deep.equal({qt: 5, unit: "kg"})
        })
        it('1010g => 1.01kg', function () {
            expect(unitManip.bestQuantity({qt: 1010, unit: "g"})).to.deep.equal({qt: 1.01, unit: "kg"})
        })
        it('2010g => 2.01kg', function () {
            expect(unitManip.bestQuantity({qt: 2010, unit: "g"})).to.deep.equal({qt: 2.01, unit: "kg"})
        })
        it('0.0000001kg => 0.1mg', function () {
            expect(unitManip.bestQuantity({qt: 0.0000001, unit: "kg"})).to.deep.equal({qt: 0.1, unit: "mg"})
        })
        it('-2kg => -2mg', function () {
            expect(unitManip.bestQuantity({qt: -2, unit: "kg"})).to.deep.equal({qt: -2, unit: "kg"})
        })
    })
    
    describe('change unit', function () {
        it('10t kg => 10000', function () {
            expect(unitManip.changeUnit({qt: 10, unit: "t"}, "kg")).to.equal(10000)
        })
        it('0.001t kg => 1', function () {
            expect(unitManip.changeUnit({qt: 0.001, unit: "t"}, "kg")).to.equal(1)
        })
        it('1kg kg => 1', function () {
            expect(unitManip.changeUnit({qt: 1, unit: "kg"}, "kg")).to.equal(1)
        })
    })
    
})