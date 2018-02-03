"use strict";
const Parser = require("../src/index");

describe("typeTypeOrVoid", () => {
  it("typeType", () => {
    expect(Parser.parse("boolean", parser => parser.typeTypeOrVoid())).toEqual({
      type: "PRIMITIVE_TYPE",
      value: "boolean"
    });
  });

  it("void", () => {
    expect(Parser.parse("void", parser => parser.typeTypeOrVoid())).toEqual({
      type: "VOID"
    });
  });
});
