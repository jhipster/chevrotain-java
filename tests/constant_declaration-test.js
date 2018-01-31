"use strict";
const Parser = require("../src/index");

describe("constantDeclaration", () => {
  it("single declaration", () => {
    expect(
      Parser.parse("boolean A = this;", parser => parser.constantDeclaration())
    ).toEqual({
      type: "CONSTANT_DECLARATION",
      typeType: {
        type: "TYPE_TYPE",
        annotations: [],
        value: { type: "PRIMITIVE_TYPE", value: "boolean" },
        cntSquares: 0
      },
      declarators: [
        {
          type: "CONSTANT_DECLARATOR",
          name: "A",
          cntSquares: 0,
          init: {
            type: "THIS"
          }
        }
      ]
    });
  });

  it("mutiple declarations", () => {
    expect(
      Parser.parse("boolean A = this, B = super;", parser =>
        parser.constantDeclaration()
      )
    ).toEqual({
      type: "CONSTANT_DECLARATION",
      typeType: {
        type: "TYPE_TYPE",
        annotations: [],
        value: { type: "PRIMITIVE_TYPE", value: "boolean" },
        cntSquares: 0
      },
      declarators: [
        {
          type: "CONSTANT_DECLARATOR",
          name: "A",
          cntSquares: 0,
          init: {
            type: "THIS"
          }
        },
        {
          type: "CONSTANT_DECLARATOR",
          name: "B",
          cntSquares: 0,
          init: {
            type: "SUPER"
          }
        }
      ]
    });
  });
});
