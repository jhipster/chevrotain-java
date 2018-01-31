"use strict";
const Parser = require("../src/index");

describe("continueStatement", () => {
  it("with identifier", () => {
    expect(
      Parser.parse("continue a;", parser => parser.continueStatement())
    ).toEqual({
      type: "CONTINUE_STATEMENT",
      identifier: "a"
    });
  });

  it("without identifier", () => {
    expect(
      Parser.parse("continue;", parser => parser.continueStatement())
    ).toEqual({
      type: "CONTINUE_STATEMENT",
      identifier: undefined
    });
  });
});
