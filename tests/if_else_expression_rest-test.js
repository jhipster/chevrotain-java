"use strict";
const Parser = require("../src/index");

describe("ifElseExpressionRest", () => {
  it("simple", () => {
    expect(
      Parser.parse("? super : null", parser => parser.ifElseExpressionRest())
    ).toEqual({
      type: "IF_ELSE_EXPRESSION_REST",
      if: {
        type: "SUPER"
      },
      else: {
        type: "NULL"
      }
    });
  });
});
