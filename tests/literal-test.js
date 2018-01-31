"use strict";
const Parser = require("../src/index");

describe("literal", () => {
  it("integerLiteral", () => {
    expect(Parser.parse("10", parser => parser.literal())).toEqual({
      type: "DECIMAL_LITERAL",
      value: "10"
    });
  });

  it("floatLiteral", () => {
    expect(Parser.parse("0.1", parser => parser.literal())).toEqual({
      type: "FLOAT_LITERAL",
      value: "0.1"
    });
  });

  it("charLiteral", () => {
    expect(Parser.parse("'A'", parser => parser.literal())).toEqual({
      type: "CHAR_LITERAL",
      value: "'A'"
    });
  });

  it("stringLiteral", () => {
    expect(Parser.parse('"A"', parser => parser.literal())).toEqual({
      type: "STRING_LITERAL",
      value: '"A"'
    });
  });

  it("booleanLiteral", () => {
    expect(Parser.parse("true", parser => parser.literal())).toEqual({
      type: "BOOLEAN_LITERAL",
      value: "true"
    });
  });

  it("nullLiteral", () => {
    expect(Parser.parse("null", parser => parser.literal())).toEqual({
      type: "NULL"
    });
  });
});
