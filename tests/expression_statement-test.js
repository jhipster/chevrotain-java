"use strict";
const Parser = require("../src/index");

describe("expressionStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("this;", parser => parser.expressionStatement())
    ).toEqual({
      type: "EXPRESSION_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });
});
