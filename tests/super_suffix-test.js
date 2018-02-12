"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("superSuffix", () => {
  it("arguments", () => {
    expect(Parser.parse("()", parser => parser.superSuffix())).to.eql({
      type: "ARGUMENTS"
    });
  });

  it("with arguments", () => {
    expect(Parser.parse(".a", parser => parser.superSuffix())).to.eql({
      type: "DOT_IDENTIFIER_ARGUMENTS",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      arguments: undefined
    });
  });
});
