"use strict";
const Parser = require("../src/index");

describe("methodBody", () => {
  it("block", () => {
    expect(Parser.parse("{}", parser => parser.methodBody())).toEqual({
      type: "BLOCK",
      statements: []
    });
  });

  it("semiColon", () => {
    expect(Parser.parse(";", parser => parser.methodBody())).toEqual(undefined);
  });
});
