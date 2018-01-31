"use strict";
const Parser = require("../src/index");

describe("doWhileStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("do {} while (this);", parser => parser.doWhileStatement())
    ).toEqual({
      type: "DO_WHILE_STATEMENT",
      body: {
        type: "BLOCK",
        statements: []
      },
      condition: {
        type: "THIS"
      }
    });
  });
});
