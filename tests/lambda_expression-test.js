"use strict";
const Parser = require("../src/index");

describe("lambdaExpression", () => {
  it("empty parameters", () => {
    expect(
      Parser.parse("() -> {}", parser => parser.lambdaExpression())
    ).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "EMPTY_PARAMETERS"
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });
});
