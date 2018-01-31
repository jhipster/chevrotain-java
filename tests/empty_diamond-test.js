"use strict";
const Parser = require("../src/index");

describe("emptyDiamond", () => {
  it("simple", () => {
    expect(Parser.parse("<>", parser => parser.emptyDiamond())).toEqual({
      type: "EMPTY_DIAMOND"
    });
  });
});
