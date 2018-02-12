"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("doWhileStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("do {} while (this);", parser => parser.doWhileStatement())
    ).to.eql({
      type: "DO_WHILE_STATEMENT",
      body: {
        type: "BLOCK",
        statements: []
      },
      condition: {
        type: "THIS"
      }
    });
  });
});
