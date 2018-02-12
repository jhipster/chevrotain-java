"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("constantDeclaration", () => {
  it("single declaration", () => {
    expect(
      Parser.parse("boolean A = this;", parser => parser.constantDeclaration())
    ).to.eql({
      type: "CONSTANT_DECLARATION",
      typeType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      declarators: [
        {
          type: "CONSTANT_DECLARATOR",
          name: {
            type: "IDENTIFIER",
            value: "A"
          },
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
    ).to.eql({
      type: "CONSTANT_DECLARATION",
      typeType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      declarators: [
        {
          type: "CONSTANT_DECLARATOR",
          name: {
            type: "IDENTIFIER",
            value: "A"
          },
          cntSquares: 0,
          init: {
            type: "THIS"
          }
        },
        {
          type: "CONSTANT_DECLARATOR",
          name: {
            type: "IDENTIFIER",
            value: "B"
          },
          cntSquares: 0,
          init: {
            type: "SUPER"
          }
        }
      ]
    });
  });
});
