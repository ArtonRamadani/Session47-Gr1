const { describe } = require("mocha");
const { add } = require("../helpers/math");
// const { expect } = require("chai");

describe('math add function', function () {
    it('add 5 + 3 return 8', async function () {
        const { expect } = await import("chai")
        expect(add(5, 3)).to.equal(8);
    });
    it('add 5 + 4 return 9', async function () {
        const { expect } = await import("chai")
        expect(add(5, 4)).to.equal(9);
    });
});