"use strict";
const Parser = require("../src/index");

describe("enhancedForControl", () => {
  it("empty", () => {
    expect(
      Parser.parse("boolean a : this", parser => parser.enhancedForControl())
    ).toEqual({
      type: "ENHANCED_FOR_CONTROL",
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
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      },
      iterator: {
        type: "THIS"
      }
    });
  });

  it("one modifier", () => {
    expect(
      Parser.parse("@Bean boolean a : this", parser =>
        parser.enhancedForControl()
      )
    ).toEqual({
      type: "ENHANCED_FOR_CONTROL",
      modifiers: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["Bean"]
          },
          hasBraces: false
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
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      },
      iterator: {
        type: "THIS"
      }
    });
  });

  it("multiple modifiers", () => {
    expect(
      Parser.parse("@Bean final boolean a : this", parser =>
        parser.enhancedForControl()
      )
    ).toEqual({
      type: "ENHANCED_FOR_CONTROL",
      modifiers: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["Bean"]
          },
          hasBraces: false
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
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      },
      iterator: {
        type: "THIS"
      }
    });
  });
});
