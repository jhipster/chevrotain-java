"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("squareExpressionRest", () => {
  it("squareExpression", () => {
    expect(
      Parser.parse("[super]", parser => parser.squareExpressionRest())
    ).to.eql({
      type: "SQUARE_EXPRESSION_REST",
      expression: {
        type: "SUPER"
      }
    });
  });
});
