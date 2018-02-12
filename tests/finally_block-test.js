"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("finallyBlock", () => {
  it("empty", () => {
    expect(Parser.parse("finally {}", parser => parser.finallyBlock())).to.eql({
      type: "FINALLY_BLOCK",
      block: {
        type: "BLOCK",
        statements: []
      }
    });
  });
});
