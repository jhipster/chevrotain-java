"use strict";
const Parser = require("../src/index");

describe("synchronizedStatement", () => {
  it("simple", () => {
    expect(
      Parser.parse("synchronized (this) {}", parser =>
        parser.synchronizedStatement()
      )
    ).toEqual({
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
