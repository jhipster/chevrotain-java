"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("ifElseExpressionRest", () => {
  it("simple", () => {
    expect(
      Parser.parse("? super : null", parser => parser.ifElseExpressionRest())
    ).to.eql({
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
