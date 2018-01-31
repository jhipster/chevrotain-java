"use strict";
const Parser = require("../src/index");

describe("localVariableDeclaration", () => {
  it("simple", () => {
    expect(
      Parser.parse("boolean A", parser => parser.localVariableDeclaration())
    ).toEqual({
      type: "LOCAL_VARIABLE_DECLARATION",
      modifiers: [],
      typeType: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 0
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
    });
  });

  it("one modifier", () => {
    expect(
      Parser.parse("@Bean boolean A", parser =>
        parser.localVariableDeclaration()
      )
    ).toEqual({
      type: "LOCAL_VARIABLE_DECLARATION",
      modifiers: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["Bean"]
          },
          hasBraces: false,
          value: undefined
        }
      ],
      typeType: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 0
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
    });
  });

  it("multiple modifiers", () => {
    expect(
      Parser.parse("@Bean final boolean A", parser =>
        parser.localVariableDeclaration()
      )
    ).toEqual({
      type: "LOCAL_VARIABLE_DECLARATION",
      modifiers: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["Bean"]
          },
          hasBraces: false,
          value: undefined
        },
        {
          type: "MODIFIER",
          value: "final"
        }
      ],
      typeType: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 0
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
    });
  });
});
