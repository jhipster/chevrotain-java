"use strict";
const Parser = require("../src/index");

describe("superSuffix", () => {
  it("arguments", () => {
    expect(Parser.parse("()", parser => parser.superSuffix())).toEqual({
      type: "EXPRESSION_LIST",
      list: []
    });
  });

  it("with arguments", () => {
    expect(Parser.parse(".a", parser => parser.superSuffix())).toEqual({
      type: "DOT_IDENTIFIER_ARGUMENTS",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      arguments: undefined
    });
  });
});
