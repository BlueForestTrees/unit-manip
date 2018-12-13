const unitManip = require("../../src/index")
const expect = require ('chai').expect

describe("Utils", function () {
    it("findIndex", function () {
        const data = [
            {_id: "654", v: "987"},
            {_id: "653", v: "987"},
            {_id: "655", v: "987"},
            {_id: "659", v: "987"},
            {_id: "657", v: "987"}
        ]
        expect(unitManip.findIndex(data, "_id", "655")).to.equal(2)
    })
    
    it("find", function () {
        const data = [
            {_id: "654", v: "987"},
            {_id: "653", v: "987"},
            {_id: "655", v: "987"},
            {_id: "659", v: "987"},
            {_id: "657", v: "987"}
        ]
        expect(unitManip.find(data, "_id", "655")).to.deep.equal({_id: "655", v: "987"})
    })
    
    it("map", function () {
        const data = [
            {_id: "654", v: "987"},
            {_id: "653", v: "987"},
            {_id: "655", v: "987"},
            {_id: "659", v: "987"},
            {_id: "657", v: "987"}
        ]
        expect(unitManip.map(data, e => e._id)).to.deep.equal(["654", "653", "655", "659", "657"])
    })
    
    it("filter", function () {
        const data = [
            {_id: "654", v: "987"},
            {_id: "653", v: "987"},
            {_id: "655", v: "987"},
            {_id: "659", v: "987"},
            {_id: "655", v: "988"}
        ]
        expect(unitManip.filter(data, e => e._id === "655"))
            .to.deep.equal([
            {_id: "655", v: "987"},
            {_id: "655", v: "988"}
        ])
    })
})