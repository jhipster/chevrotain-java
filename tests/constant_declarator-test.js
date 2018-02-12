"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("constantDeclarator", () => {
  it("without init", () => {
    expect(
      Parser.parse("A = this", parser => parser.constantDeclarator())
    ).to.eql({
      type: "CONSTANT_DECLARATOR",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      cntSquares: 0,
      init: {
        type: "THIS"
      }
    });
  });

  it("one square", () => {
    expect(
      Parser.parse("A[] = this", parser => parser.constantDeclarator())
    ).to.eql({
      type: "CONSTANT_DECLARATOR",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      cntSquares: 1,
      init: {
        type: "THIS"
      }
    });
  });

  it("multiple squares", () => {
    expect(
      Parser.parse("A[][] = this", parser => parser.constantDeclarator())
    ).to.eql({
      type: "CONSTANT_DECLARATOR",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      cntSquares: 2,
      init: {
        type: "THIS"
      }
    });
  });
});
