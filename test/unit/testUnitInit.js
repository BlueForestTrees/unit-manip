import chai from 'chai';
import {getGrandeursKeys, getShortnames} from "../../src/index";
import {mockGrandeurs} from "../mock";

chai.should();

beforeEach(async () => {
    await mockGrandeurs();
});

describe('TU Init', function () {

    it('load grandeurs & units', async function () {
        const message = `${getShortnames().length} unités dans ${getGrandeursKeys().length} grandeurs`;
        message.should.equal("32 unités dans 9 grandeurs");
    });

});