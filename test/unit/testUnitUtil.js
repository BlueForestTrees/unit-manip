import {find, findIndex, map} from "../../src"
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

    it("find", function () {
        const data = [
            {_id: "654", v: "987"},
            {_id: "653", v: "987"},
            {_id: "655", v: "987"},
            {_id: "659", v: "987"},
            {_id: "657", v: "987"}
        ]
        expect(find(data, "_id", "655")).to.deep.equal({_id: "655", v: "987"})
    })

    it("map", function () {
        const data = [
            {_id: "654", v: "987"},
            {_id: "653", v: "987"},
            {_id: "655", v: "987"},
            {_id: "659", v: "987"},
            {_id: "657", v: "987"}
        ]
        expect(map(data, e => e._id)).to.deep.equal(["654","653","655","659","657"])
    })
})