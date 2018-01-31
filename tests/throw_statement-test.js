"use strict";
const Parser = require("../src/index");

describe("throwStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("throw this;", parser => parser.throwStatement())
    ).toEqual({
      type: "THROW_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });
});
