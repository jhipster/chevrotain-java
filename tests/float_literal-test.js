"use strict";
const Parser = require("../src/index");

describe("floatLiteral", () => {
  it("floatLiteral", () => {
    expect(Parser.parse("0.1", parser => parser.floatLiteral())).toEqual({
      type: "FLOAT_LITERAL",
      value: "0.1"
    });
  });

  it("hexFloatLiteral", () => {
    expect(Parser.parse("0x1.8p1", parser => parser.floatLiteral())).toEqual({
      type: "HEX_FLOAT_LITERAL",
      value: "0x1.8p1"
    });
  });
});
