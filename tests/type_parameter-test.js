"use strict";
const Parser = require("../src/index");

describe("typeParameter", () => {
  it("identifier", () => {
    expect(Parser.parse("A", parser => parser.typeParameter())).toEqual({
      type: "TYPE_PARAMETER",
      annotations: [],
      name: "A",
      typeBound: undefined
    });
  });

  it("annotations", () => {
    expect(Parser.parse("@Bean A", parser => parser.typeParameter())).toEqual({
      type: "TYPE_PARAMETER",
      annotations: [
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
      name: "A",
      typeBound: undefined
    });
  });

  it("typeBound", () => {
    expect(
      Parser.parse("A extends boolean", parser => parser.typeParameter())
    ).toEqual({
      type: "TYPE_PARAMETER",
      annotations: [],
      name: "A",
      typeBound: {
        type: "TYPE_BOUND",
        bounds: [
          {
            type: "TYPE_TYPE",
            annotations: [],
            value: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            cntSquares: 0
          }
        ]
      }
    });
  });
});
