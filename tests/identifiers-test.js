"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("identifiers", () => {
  it("empty", () => {
    expect(Parser.parse("()", parser => parser.identifiers())).to.eql({
      type: "IDENTIFIERS",
      identifiers: undefined
    });
  });

  it("identifierList", () => {
    expect(Parser.parse("(a)", parser => parser.identifiers())).to.eql({
      type: "IDENTIFIERS",
      identifiers: {
        type: "IDENTIFIER_LIST",
        identifiers: ["a"]
      }
    });
  });
});
