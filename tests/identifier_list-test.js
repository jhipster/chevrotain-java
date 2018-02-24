"use strict";
const Parser = require("../src/index");

describe("identifierList", () => {
  it("one identifier", () => {
    expect(Parser.parse("a", parser => parser.identifierList())).toEqual({
      type: "IDENTIFIER_LIST",
      list: ["a"]
    });
  });

  it("multiple identifiers", () => {
    expect(Parser.parse("a, b", parser => parser.identifierList())).toEqual({
      type: "IDENTIFIER_LIST",
      list: ["a", "b"]
    });
  });
});
