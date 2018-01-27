"use strict";
const Parser = require("../src/index");

describe("class", () => {
  it("empty", () => {
    expect(
      Parser.parse("class A{}", parser => parser.classDeclaration())
    ).toEqual({
      type: "CLASS_DECLARATION",
      name: "A",
      body: {
        type: "CLASS_BODY"
      }
    });
  });
});
