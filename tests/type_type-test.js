"use strict";
const Parser = require("../src/index");

describe("typeType", () => {
  it("primitiveType", () => {
    expect(Parser.parse("boolean", parser => parser.typeType())).toEqual({
      type: "PRIMITIVE_TYPE",
      value: "boolean"
    });
  });

  it("identifier", () => {
    expect(Parser.parse("A", parser => parser.typeType())).toEqual({
      type: "IDENTIFIER",
      value: "A"
    });
  });

  it("identifier with annotation", () => {
    expect(Parser.parse("@Bean boolean", parser => parser.typeType())).toEqual({
      type: "TYPE_TYPE",
      annotations: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Bean"
              }
            ]
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

  it("annotation", () => {
    expect(Parser.parse("@Bean", parser => parser.typeType())).toEqual({
      type: "ANNOTATION",
      name: {
        type: "QUALIFIED_NAME",
        name: [
          {
            type: "IDENTIFIER",
            value: "Bean"
          }
        ]
      },
      hasBraces: false
    });
  });
});
