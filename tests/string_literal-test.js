"use strict";
const Parser = require("../src/index");

describe("stringLiteral", () => {
  it("simple", () => {
    expect(
      Parser.parse('"something"', parser => parser.stringLiteral())
    ).toEqual({
      type: "STRING_LITERAL",
      value: '"something"'
    });
  });

  it("with space", () => {
    expect(
      Parser.parse('"something else"', parser => parser.stringLiteral())
    ).toEqual({
      type: "STRING_LITERAL",
      value: '"something else"'
    });
  });

  it("just some extrems", () => {
    expect(
      Parser.parse('"!? and ()$%&"', parser => parser.stringLiteral())
    ).toEqual({
      type: "STRING_LITERAL",
      value: '"!? and ()$%&"'
    });
  });
});
