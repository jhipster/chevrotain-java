"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("arguments", () => {
  it("empty", () => {
    expect(Parser.parse("()", parser => parser.arguments())).to.eql({
      type: "ARGUMENTS"
    });
  });
});
