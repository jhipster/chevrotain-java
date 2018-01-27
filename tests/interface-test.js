"use strict";
const Parser = require("../src/index");

describe("interface", () => {
  it("empty", () => {
    expect(
      Parser.parse("interface A{}", parser => parser.interfaceDeclaration())
    ).toEqual({
      type: "INTERFACE_DECLARATION",
      name: "A",
      body: {
        type: "INTERFACE_BODY"
      }
    });
  });
});
