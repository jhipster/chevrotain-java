"use strict";
const Parser = require("../src/index");

describe("constantDeclarator", () => {
  it("without init", () => {
    expect(
      Parser.parse("A = this", parser => parser.constantDeclarator())
    ).toEqual({
      type: "CONSTANT_DECLARATOR",
      name: "A",
      cntSquares: 0,
      init: {
        type: "THIS"
      }
    });
  });

  it("one square", () => {
    expect(
      Parser.parse("A[] = this", parser => parser.constantDeclarator())
    ).toEqual({
      type: "CONSTANT_DECLARATOR",
      name: "A",
      cntSquares: 1,
      init: {
        type: "THIS"
      }
    });
  });

  it("multiple squares", () => {
    expect(
      Parser.parse("A[][] = this", parser => parser.constantDeclarator())
    ).toEqual({
      type: "CONSTANT_DECLARATOR",
      name: "A",
      cntSquares: 2,
      init: {
        type: "THIS"
      }
    });
  });
});
