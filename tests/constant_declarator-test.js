"use strict";
const Parser = require("../src/index");

describe("constantDeclarator", () => {
  it("without init", () => {
    expect(Parser.parse("A =", parser => parser.constantDeclarator())).toEqual({
      type: "CONSTANT_DECLARATOR",
      name: "A",
      cntSquares: 0,
      init: undefined
    });
  });

  it("one square", () => {
    expect(
      Parser.parse("A[] =", parser => parser.constantDeclarator())
    ).toEqual({
      type: "CONSTANT_DECLARATOR",
      name: "A",
      cntSquares: 1,
      init: undefined
    });
  });

  it("multiple squares", () => {
    expect(
      Parser.parse("A[][] =", parser => parser.constantDeclarator())
    ).toEqual({
      type: "CONSTANT_DECLARATOR",
      name: "A",
      cntSquares: 2,
      init: undefined
    });
  });
});
