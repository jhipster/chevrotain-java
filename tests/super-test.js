"use strict";
const Parser = require("../src/index");

describe("super", () => {
  it("simple", () => {
    expect(Parser.parse("super ()", parser => parser.super())).toEqual({
      type: "SUPER",
      value: {
        type: "ARGUMENTS"
      }
    });
  });
});
