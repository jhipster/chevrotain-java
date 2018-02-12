"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("switchLabelCase", () => {
  it("identifier", () => {
    expect(Parser.parse("case a:", parser => parser.switchLabelCase())).to.eql({
      type: "SWITCH_LABEL_CASE",
      expression: {
        type: "IDENTIFIER",
        value: "a"
      }
    });
  });
});
