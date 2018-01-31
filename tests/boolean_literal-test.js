"use strict";
const Parser = require("../src/index");

describe("booleanLiteral", () => {
  it("true", () => {
    expect(Parser.parse("true", parser => parser.booleanLiteral())).toEqual({
      type: "BOOLEAN_LITERAL",
      value: "true"
    });
  });

  it("false", () => {
    expect(Parser.parse("false", parser => parser.booleanLiteral())).toEqual({
      type: "BOOLEAN_LITERAL",
      value: "false"
    });
  });
});
