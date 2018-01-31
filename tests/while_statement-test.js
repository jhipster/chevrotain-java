"use strict";
const Parser = require("../src/index");

describe("whileStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("while (this) {}", parser => parser.whileStatement())
    ).toEqual({
      type: "WHILE_STATEMENT",
      condition: {
        type: "THIS"
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });
});
