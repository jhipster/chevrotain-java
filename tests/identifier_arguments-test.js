"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("identifierArguments", () => {
  it("simple", () => {
    expect(Parser.parse("a()", parser => parser.identifierArguments())).to.eql({
      type: "IDENTIFIER_ARGUMENTS",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      arguments: {
        type: "ARGUMENTS"
      }
    });
  });
});
