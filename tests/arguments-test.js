"use strict";
const Parser = require("../src/index");

describe("arguments", () => {
  it("empty", () => {
    expect(Parser.parse("()", parser => parser.arguments())).toEqual({
      type: "EXPRESSION_LIST",
      list: []
    });
  });

  it("with true parameter", () => {
    expect(Parser.parse("(true)", parser => parser.arguments())).toEqual({
      type: "EXPRESSION_LIST",
      list: [
        {
          type: "BOOLEAN_LITERAL",
          value: "true"
        }
      ]
    });
  });
});
