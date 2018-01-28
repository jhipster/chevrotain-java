"use strict";
const Parser = require("../src/index");

describe("typeType", () => {
  it("primitiveType", () => {
    expect(Parser.parse("boolean", parser => parser.typeType())).toEqual({
      type: "TYPE_TYPE",
      annotations: [],
      value: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      cntSquares: 0
    });
  });

  it("classOrInterfaceType", () => {
    expect(Parser.parse("A", parser => parser.typeType())).toEqual({
      type: "TYPE_TYPE",
      annotations: [],
      value: {
        type: "CLASS_OR_INTERFACE_TYPE",
        elements: [
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "A",
            typeArguments: undefined
          }
        ]
      },
      cntSquares: 0
    });
  });

  it("annotation", () => {
    expect(Parser.parse("@Bean boolean", parser => parser.typeType())).toEqual({
      type: "TYPE_TYPE",
      annotations: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["Bean"]
          },
          hasBraces: false
        }
      ],
      value: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      cntSquares: 0
    });
  });

  it("one square", () => {
    expect(Parser.parse("boolean[]", parser => parser.typeType())).toEqual({
      type: "TYPE_TYPE",
      annotations: [],
      value: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      cntSquares: 1
    });
  });

  it("multiple square", () => {
    expect(Parser.parse("boolean[][]", parser => parser.typeType())).toEqual({
      type: "TYPE_TYPE",
      annotations: [],
      value: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      cntSquares: 2
    });
  });
});
