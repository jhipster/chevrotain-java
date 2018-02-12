"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("breakStatement", () => {
  it("with identifier", () => {
    expect(Parser.parse("break a;", parser => parser.breakStatement())).to.eql({
      type: "BREAK_STATEMENT",
      identifier: {
        type: "IDENTIFIER",
        value: "a"
      }
    });
  });

  it("without identifier", () => {
    expect(Parser.parse("break;", parser => parser.breakStatement())).to.eql({
      type: "BREAK_STATEMENT",
      identifier: undefined
    });
  });
});
