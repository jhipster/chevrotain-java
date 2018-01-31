"use strict";
const Parser = require("../src/index");

describe("returnStatement", () => {
  it("with expression", () => {
    expect(
      Parser.parse("return this;", parser => parser.returnStatement())
    ).toEqual({
      type: "RETURN_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });

  it("only return", () => {
    expect(Parser.parse("return;", parser => parser.returnStatement())).toEqual(
      {
        type: "RETURN_STATEMENT",
        expression: undefined
      }
    );
  });
});
