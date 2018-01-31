"use strict";
const Parser = require("../src/index");

describe("switchStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("switch (this) {}", parser => parser.switchStatement())
    ).toEqual({
      type: "SWITCH_STATEMENT",
      condition: {
        type: "THIS"
      }
    });
  });
});
