"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("synchronizedStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("synchronized (this) {}", parser =>
        parser.synchronizedStatement()
      )
    ).to.eql({
      type: "SYNCHRONIZED_STATEMENT",
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
