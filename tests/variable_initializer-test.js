"use strict";
const Parser = require("../src/index");

describe("variableInitializer", () => {
  it("expression", () => {
    expect(
      Parser.parse("this", parser => parser.variableInitializer())
    ).toEqual({
      type: "THIS"
    });
  });

  it("arrayInitializer", () => {
    expect(Parser.parse("{}", parser => parser.variableInitializer())).toEqual({
      type: "ARRAY_INITIALIZER",
      variableInitializers: []
    });
  });
});
