"use strict";
const Parser = require("../src/index");

describe("resource", () => {
  it("simple", () => {
    expect(Parser.parse("A.B a = this", parser => parser.resource())).toEqual({
      type: "RESOURCE",
      modifiers: [],
      typeType: {
        type: "CLASS_OR_INTERFACE_TYPE",
        elements: [
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "A",
            typeArguments: undefined
          },
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "B",
            typeArguments: undefined
          }
        ]
      },
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      },
      expression: {
        type: "THIS"
      }
    });
  });

  it("one annotation", () => {
    expect(
      Parser.parse("final A.B a = this", parser => parser.resource())
    ).toEqual({
      type: "RESOURCE",
      modifiers: [{ type: "MODIFIER", value: "final" }],
      typeType: {
        type: "CLASS_OR_INTERFACE_TYPE",
        elements: [
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "A",
            typeArguments: undefined
          },
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "B",
            typeArguments: undefined
          }
        ]
      },
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      },
      expression: {
        type: "THIS"
      }
    });
  });

  it("multiple annotations", () => {
    expect(
      Parser.parse("@Bean final A.B a = this", parser => parser.resource())
    ).toEqual({
      type: "RESOURCE",
      modifiers: [
        {
          type: "ANNOTATION",
          name: { type: "QUALIFIED_NAME", name: ["Bean"] },
          hasBraces: false,
          value: undefined
        },
        { type: "MODIFIER", value: "final" }
      ],
      typeType: {
        type: "CLASS_OR_INTERFACE_TYPE",
        elements: [
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "A",
            typeArguments: undefined
          },
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "B",
            typeArguments: undefined
          }
        ]
      },
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      },
      expression: {
        type: "THIS"
      }
    });
  });
});
