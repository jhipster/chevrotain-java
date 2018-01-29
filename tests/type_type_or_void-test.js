"use strict";
const Parser = require("../src/index");

describe("typeTypeOrVoid", () => {
  it("typeType", () => {
    expect(Parser.parse("boolean", parser => parser.typeTypeOrVoid())).toEqual({
      type: "TYPE_TYPE",
      annotations: [],
      value: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      cntSquares: 0
    });
  });

  it("void", () => {
    expect(Parser.parse("void", parser => parser.typeTypeOrVoid())).toEqual({
      type: "VOID"
    });
  });
});
