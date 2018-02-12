"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("forStatement", () => {
  it("basicForStatement: empty", () => {
    expect(Parser.parse("for (;;) {}", parser => parser.forStatement())).to.eql(
      {
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
      }
    );
  });
});
