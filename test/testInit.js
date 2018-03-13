import chai from 'chai';
import {getGrandeurs, getGrandeursKeys, getShortnames, getUnits, initUnits} from "../src";
import {mockGrandeurs} from "./mock";

chai.should();

beforeEach(async () => {
    await mockGrandeurs();
});

describe('TU commons', function () {

    it('initUnits', async function () {
        const message = `${getShortnames().length} unités dans ${getGrandeursKeys().length} grandeurs`;
        message.should.equal("32 unités dans 9 grandeurs");
    });

});