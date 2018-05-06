"use strict";
const Parser = require("../src/index");

describe("literal", () => {
  it("integerLiteral: positive", () => {
    expect(Parser.parse("10", parser => parser.literal())).toEqual({
      type: "DECIMAL_LITERAL",
      value: "10"
    });
  });

  it("integerLiteral: negative", () => {
    expect(Parser.parse("-10", parser => parser.literal())).toEqual({
      type: "DECIMAL_LITERAL",
      value: "-10"
    });
  });

  it("floatLiteral: positive", () => {
    expect(Parser.parse("0.1", parser => parser.literal())).toEqual({
      type: "FLOAT_LITERAL",
      value: "0.1"
    });
  });

  it("floatLiteral: negative", () => {
    expect(Parser.parse("-0.1", parser => parser.literal())).toEqual({
      type: "FLOAT_LITERAL",
      value: "-0.1"
    });
  });

  it("charLiteral: simple", () => {
    expect(Parser.parse("'A'", parser => parser.literal())).toEqual({
      type: "CHAR_LITERAL",
      value: "'A'"
    });
  });

  it("charLiteral: backslash", () => {
    expect(Parser.parse("'\\'", parser => parser.literal())).toEqual({
      type: "CHAR_LITERAL",
      value: "'\\'"
    });
  });

  it("charLiteral: singleQuote", () => {
    // prettier-ignore
    // eslint-disable-next-line no-useless-escape
    expect(Parser.parse("'\''", parser => parser.literal())).toEqual({
      type: "CHAR_LITERAL",
      value: "'''"
    });
  });

  it("charLiteral: newLine", () => {
    expect(Parser.parse("'\n'", parser => parser.literal())).toEqual({
      type: "CHAR_LITERAL",
      value: "'\n'"
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
