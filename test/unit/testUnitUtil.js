import {findIndex} from "../../src"
import {expect} from 'chai'

describe("Utils", function () {
    it("findIndex", function () {
        const data = [
            {_id: "654", v: "987"},
            {_id: "653", v: "987"},
            {_id: "655", v: "987"},
            {_id: "659", v: "987"},
            {_id: "657", v: "987"}
        ]
        expect(findIndex(data, "_id", "655")).to.equal(2)
    })
})