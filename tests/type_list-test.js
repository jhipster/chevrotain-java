"use strict";
const Parser = require("../src/index");

describe("typeList", () => {
  it("single", () => {
    expect(Parser.parse("boolean", parser => parser.typeList())).toEqual({
      type: "TYPE_LIST",
      list: [
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
    });
  });

  it("multiple", () => {
    expect(Parser.parse("boolean, char", parser => parser.typeList())).toEqual({
      type: "TYPE_LIST",
      list: [
        {
          type: "TYPE_TYPE",
          annotations: [],
          value: {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          },
          cntSquares: 0
        },
        {
          type: "TYPE_TYPE",
          annotations: [],
          value: {
            type: "PRIMITIVE_TYPE",
            value: "char"
          },
          cntSquares: 0
        }
      ]
    });
  });
});
