"use strict";
const Parser = require("../src/index");

describe("arguments", () => {
  it("empty", () => {
    expect(Parser.parse("()", parser => parser.arguments())).toEqual({
      type: "ARGUMENTS"
    });
  });
});
