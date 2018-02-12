"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("lambdaExpression", () => {
  it("empty parameters", () => {
    expect(
      Parser.parse("() -> {}", parser => parser.lambdaExpression())
    ).to.eql({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "FORMAL_PARAMETERS",
        parameters: undefined
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });
});
