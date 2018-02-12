"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("typeTypeOrVoid", () => {
  it("typeType", () => {
    expect(Parser.parse("boolean", parser => parser.typeTypeOrVoid())).to.eql({
      type: "PRIMITIVE_TYPE",
      value: "boolean"
    });
  });

  it("void", () => {
    expect(Parser.parse("void", parser => parser.typeTypeOrVoid())).to.eql({
      type: "VOID"
    });
  });
});
