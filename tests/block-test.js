"use strict";
const Parser = require("../src/index");

describe("block", () => {
  it("empty", () => {
    expect(Parser.parse("{}", parser => parser.block())).toEqual({
      type: "BLOCK",
      statements: []
    });
  });
});
