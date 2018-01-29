"use strict";
const Parser = require("../src/index");

describe("methodBody", () => {
  it("empty", () => {
    expect(Parser.parse("{}", parser => parser.methodBody())).toEqual({
      type: "BLOCK",
      statements: []
    });
  });
});
