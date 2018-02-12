"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("methodBody", () => {
  it("empty", () => {
    expect(Parser.parse("{}", parser => parser.methodBody())).to.eql({
      type: "BLOCK",
      statements: []
    });
  });
});
