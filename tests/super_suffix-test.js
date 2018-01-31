"use strict";
const Parser = require("../src/index");

describe("superSuffix", () => {
  it("arguments", () => {
    expect(Parser.parse("()", parser => parser.superSuffix())).toEqual({
      type: "ARGUMENTS"
    });
  });

  it("with arguments", () => {
    expect(Parser.parse(".a", parser => parser.superSuffix())).toEqual({
      type: "DOT_IDENTIFIER_ARGUMENTS",
      name: "a",
      arguments: undefined
    });
  });
});
