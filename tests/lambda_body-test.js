"use strict";
const Parser = require("../src/index");

describe("lambdaBody", () => {
  it("block", () => {
    expect(Parser.parse("{}", parser => parser.lambdaBody())).toEqual({
      type: "BLOCK",
      statements: []
    });
  });

  it("expression", () => {
    expect(Parser.parse("this", parser => parser.lambdaBody())).toEqual({
      type: "THIS"
    });
  });
});
