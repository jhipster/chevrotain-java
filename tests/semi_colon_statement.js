"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("semiColonStatement", () => {
  it("simple", () => {
    expect(Parser.parse(";", parser => parser.semiColonStatement())).to.eql({
      type: "SEMI_COLON_STATEMENT"
    });
  });
});
