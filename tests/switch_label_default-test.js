"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("switchLabelDefault", () => {
  it("simple", () => {
    expect(
      Parser.parse("default :", parser => parser.switchLabelDefault())
    ).to.eql({
      type: "SWITCH_LABEL_DEFAULT"
    });
  });
});
