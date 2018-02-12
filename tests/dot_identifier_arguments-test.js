"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("dotIdentifierArguments", () => {
  it("without arguments", () => {
    expect(
      Parser.parse(".a", parser => parser.dotIdentifierArguments())
    ).to.eql({
      type: "DOT_IDENTIFIER_ARGUMENTS",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      arguments: undefined
    });
  });

  it("with arguments", () => {
    expect(
      Parser.parse(".a()", parser => parser.dotIdentifierArguments())
    ).to.eql({
      type: "DOT_IDENTIFIER_ARGUMENTS",
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
