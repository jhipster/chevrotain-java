"use strict";
const Parser = require("../src/index");

describe("expressionList", () => {
  it("single", () => {
    expect(Parser.parse("this", parser => parser.expressionList())).toEqual({
      type: "EXPRESSION_LIST",
      list: [
        {
          type: "THIS"
        }
      ]
    });
  });

  it("multiple", () => {
    expect(
      Parser.parse("this, null", parser => parser.expressionList())
    ).toEqual({
      type: "EXPRESSION_LIST",
      list: [
        {
          type: "THIS"
        },
        {
          type: "NULL"
        }
      ]
    });
  });
});
