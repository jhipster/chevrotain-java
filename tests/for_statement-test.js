"use strict";
const Parser = require("../src/index");

describe("forStatement", () => {
  it("basicForStatement: empty", () => {
    expect(
      Parser.parse("for (;;) {}", parser => parser.forStatement())
    ).toEqual({
      type: "FOR_STATEMENT",
      forControl: {
        type: "BASIC_FOR_STATEMENT",
        forInit: undefined,
        expression: undefined,
        expressionList: undefined
      },
      statement: {
        type: "BLOCK",
        statements: []
      }
    });
  });
});
