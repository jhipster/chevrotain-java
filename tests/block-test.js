"use strict";
const Parser = require("../src/index");

describe("block", () => {
  it("empty", () => {
    expect(Parser.parse("{}", parser => parser.block())).toEqual({
      type: "BLOCK",
      statements: []
    });
  });

  it("single statement", () => {
    expect(Parser.parse("{ boolean A; }", parser => parser.block())).toEqual({
      type: "BLOCK",
      statements: [
        {
          type: "LOCAL_VARIABLE_DECLARATION",
          modifiers: [],
          typeType: {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          },
          declarators: {
            type: "VARIABLE_DECLARATORS",
            list: [
              {
                type: "VARIABLE_DECLARATOR",
                id: {
                  type: "VARIABLE_DECLARATOR_ID",
                  id: "A",
                  cntSquares: 0
                },
                init: undefined
              }
            ]
          }
        }
      ]
    });
  });

  it("multiple statement", () => {
    expect(
      Parser.parse("{ boolean A; class A {} }", parser => parser.block())
    ).toEqual({
      type: "BLOCK",
      statements: [
        {
          type: "LOCAL_VARIABLE_DECLARATION",
          modifiers: [],
          typeType: {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          },
          declarators: {
            type: "VARIABLE_DECLARATORS",
            list: [
              {
                type: "VARIABLE_DECLARATOR",
                id: {
                  type: "VARIABLE_DECLARATOR_ID",
                  id: "A",
                  cntSquares: 0
                },
                init: undefined
              }
            ]
          }
        },
        {
          type: "LOCAL_TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "CLASS_DECLARATION",
            name: "A",
            typeParameters: undefined,
            extends: undefined,
            implements: undefined,
            body: {
              type: "CLASS_BODY",
              declarations: []
            }
          }
        }
      ]
    });
  });
});
