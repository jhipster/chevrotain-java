"use strict";
const Parser = require("../src/index");

describe("integerLiteral", () => {
  it("decimalLiteral", () => {
    expect(Parser.parse("10", parser => parser.integerLiteral())).toEqual({
      type: "DECIMAL_LITERAL",
      value: "10"
    });
  });

  it("hexLiteral", () => {
    expect(Parser.parse("0x9", parser => parser.integerLiteral())).toEqual({
      type: "HEX_LITERAL",
      value: "0x9"
    });
  });

  it("octLiteral", () => {
    expect(Parser.parse("010", parser => parser.integerLiteral())).toEqual({
      type: "OCT_LITERAL",
      value: "010"
    });
  });

  it("binaryLiteral", () => {
    expect(Parser.parse("0b1", parser => parser.integerLiteral())).toEqual({
      type: "BINARY_LITERAL",
      value: "0b1"
    });
  });
});
