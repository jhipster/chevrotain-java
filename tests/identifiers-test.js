"use strict";
const Parser = require("../src/index");

describe("identifiers", () => {
  it("empty", () => {
    expect(Parser.parse("()", parser => parser.identifiers())).toEqual({
      type: "IDENTIFIERS",
      identifiers: undefined
    });
  });

  it("identifierList", () => {
    expect(Parser.parse("(a)", parser => parser.identifiers())).toEqual({
      type: "IDENTIFIERS",
      identifiers: {
        type: "IDENTIFIER_LIST",
        identifiers: ["a"]
      }
    });
  });
});
