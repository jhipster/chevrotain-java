"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("throwStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("throw this;", parser => parser.throwStatement())
    ).to.eql({
      type: "THROW_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });
});
