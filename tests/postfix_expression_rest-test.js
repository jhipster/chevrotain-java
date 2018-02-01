"use strict";
const Parser = require("../src/index");

describe("postfixExpressionRest", () => {
  it("postfixExpression PlusPlus", () => {
    expect(
      Parser.parse("++", parser => parser.postfixExpressionRest())
    ).toEqual({
      type: "POSTFIX_EXPRESSION_REST",
      value: "++"
    });
  });

  it("postfixExpression MinusMinus", () => {
    expect(
      Parser.parse("--", parser => parser.postfixExpressionRest())
    ).toEqual({
      type: "POSTFIX_EXPRESSION_REST",
      value: "--"
    });
  });
});
