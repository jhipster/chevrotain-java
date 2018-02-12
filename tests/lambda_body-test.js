"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("lambdaBody", () => {
  it("block", () => {
    expect(Parser.parse("{}", parser => parser.lambdaBody())).to.eql({
      type: "BLOCK",
      statements: []
    });
  });

  it("expression", () => {
    expect(Parser.parse("this", parser => parser.lambdaBody())).to.eql({
      type: "THIS"
    });
  });
});
