"use strict";
const Parser = require("../src/index");

describe("identifierStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("a:this;", parser => parser.identifierStatement())
    ).toEqual({
      type: "IDENTIFIER_STATEMENT",
      identifier: "a",
      statement: {
        type: "EXPRESSION_STATEMENT",
        expression: {
          type: "THIS"
        }
      }
    });
  });
});
