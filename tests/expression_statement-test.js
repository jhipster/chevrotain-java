"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("expressionStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("this;", parser => parser.expressionStatement())
    ).to.eql({
      type: "EXPRESSION_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });
});
