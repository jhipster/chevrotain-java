"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("whileStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("while (this) {}", parser => parser.whileStatement())
    ).to.eql({
      type: "WHILE_STATEMENT",
      condition: {
        type: "THIS"
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });
});
