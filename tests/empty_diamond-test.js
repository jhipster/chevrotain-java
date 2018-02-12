"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("emptyDiamond", () => {
  it("simple", () => {
    expect(Parser.parse("<>", parser => parser.emptyDiamond())).to.eql({
      type: "EMPTY_DIAMOND"
    });
  });
});
