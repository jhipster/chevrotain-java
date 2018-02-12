"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("enumBodyDeclarations", () => {
  it("empty", () => {
    expect(Parser.parse(";", parser => parser.enumBodyDeclarations())).to.eql({
      type: "ENUM_BODY_DECLARATIONS",
      declarations: []
    });
  });

  it("one declaration", () => {
    expect(
      Parser.parse("; void a() {}", parser => parser.enumBodyDeclarations())
    ).to.eql({
      type: "ENUM_BODY_DECLARATIONS",
      declarations: [
        {
          type: "CLASS_BODY_MEMBER_DECLARATION",
          modifiers: [],
          declaration: {
            type: "METHOD_DECLARATION",
            typeType: {
              type: "VOID"
            },
            name: {
              type: "IDENTIFIER",
              value: "a"
            },
            parameters: {
              type: "FORMAL_PARAMETERS",
              parameters: undefined
            },
            cntSquares: 0,
            throws: undefined,
            body: {
              type: "BLOCK",
              statements: []
            }
          }
        }
      ]
    });
  });

  it("multiple declarations", () => {
    expect(
      Parser.parse("; void a() {} {}", parser => parser.enumBodyDeclarations())
    ).to.eql({
      type: "ENUM_BODY_DECLARATIONS",
      declarations: [
        {
          type: "CLASS_BODY_MEMBER_DECLARATION",
          modifiers: [],
          declaration: {
            type: "METHOD_DECLARATION",
            typeType: {
              type: "VOID"
            },
            name: {
              type: "IDENTIFIER",
              value: "a"
            },
            parameters: {
              type: "FORMAL_PARAMETERS",
              parameters: undefined
            },
            cntSquares: 0,
            throws: undefined,
            body: {
              type: "BLOCK",
              statements: []
            }
          }
        },
        {
          type: "CLASS_BODY_BLOCK",
          static: false,
          block: {
            type: "BLOCK",
            statements: []
          }
        }
      ]
    });
  });
});
