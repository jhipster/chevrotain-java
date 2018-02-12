"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("super", () => {
  it("simple", () => {
    expect(Parser.parse("super ()", parser => parser.super())).to.eql({
      type: "SUPER",
      value: {
        type: "ARGUMENTS"
      }
    });
  });
});
