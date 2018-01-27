"use strict";
const Parser = require("../src/index");

describe("enum", () => {
  it("empty", () => {
    expect(
      Parser.parse("enum A{}", parser => parser.enumDeclaration())
    ).toEqual({
      type: "ENUM_DECLARATION",
      name: "A"
    });
  });
});
