"use strict";
const Parser = require("../src/index");

describe("forStatement", () => {
  it("basicForStatement: empty", () => {
    expect(
      Parser.parse("for (;;) {}", parser => parser.forStatement())
    ).toEqual({
      type: "FOR_STATEMENT",
      forControl: {
        type: "BASIC_FOR_CONTROL",
        forInit: undefined,
        expression: undefined,
        expressionList: undefined
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });
});
