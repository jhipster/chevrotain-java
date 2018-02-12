"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("identifierList", () => {
  it("one identifier", () => {
    expect(Parser.parse("a", parser => parser.identifierList())).to.eql({
      type: "IDENTIFIER_LIST",
      identifiers: ["a"]
    });
  });

  it("multiple identifiers", () => {
    expect(Parser.parse("a, b", parser => parser.identifierList())).to.eql({
      type: "IDENTIFIER_LIST",
      identifiers: ["a", "b"]
    });
  });
});
