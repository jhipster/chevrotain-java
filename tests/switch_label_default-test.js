"use strict";
const Parser = require("../src/index");

describe("switchLabelDefault", () => {
  it("simple", () => {
    expect(
      Parser.parse("default :", parser => parser.switchLabelDefault())
    ).toEqual({
      type: "SWITCH_LABEL_DEFAULT"
    });
  });
});
