"use strict";
const Parser = require("../src/index");

describe("finallyBlock", () => {
  it("empty", () => {
    expect(Parser.parse("finally {}", parser => parser.finallyBlock())).toEqual(
      {
        type: "FINALLY_BLOCK",
        block: {
          type: "BLOCK",
          statements: []
        }
      }
    );
  });
});
