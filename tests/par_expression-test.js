"use strict";
const Parser = require("../src/index");

describe("parExpression", () => {
  it("simple", () => {
    expect(Parser.parse("(this)", parser => parser.parExpression())).toEqual({
      type: "PAR_EXPRESSION",
      expression: {
        type: "THIS"
      }
    });
  });
});
