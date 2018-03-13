import {mockGrandeurs} from "../mock";
import {bestRound} from "../../src/index";
import chai from 'chai';

chai.should();

beforeEach(async () => {
    await mockGrandeurs();
});

describe('TU calculations', function () {
    describe('best round', function () {
        it('999 999', function () {
            bestRound(999).should.equal(999);
        });
        it('999.1 999', function () {
            bestRound(999.1).should.equal(999);
        });
        it('999.6 1000', function () {
            bestRound(999.6).should.equal(1000);
        });
        it('99.61 99.9', function () {
            bestRound(99.91).should.equal(99.9);
        });
        it('9.991 9.99', function () {
            bestRound(9.991).should.equal(9.99);
        });
        it('0.9991 0.999', function () {
            bestRound(0.9991).should.equal(0.999);
        });
    });
});