"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("postfixExpressionRest", () => {
  it("postfixExpression PlusPlus", () => {
    expect(Parser.parse("++", parser => parser.postfixExpressionRest())).to.eql(
      {
        type: "POSTFIX_EXPRESSION_REST",
        value: "++"
      }
    );
  });

  it("postfixExpression MinusMinus", () => {
    expect(Parser.parse("--", parser => parser.postfixExpressionRest())).to.eql(
      {
        type: "POSTFIX_EXPRESSION_REST",
        value: "--"
      }
    );
  });
});
