"use strict";
const Parser = require("../src/index");

describe("semiColonStatement", () => {
  it("simple", () => {
    expect(Parser.parse(";", parser => parser.semiColonStatement())).toEqual({
      type: "SEMI_COLON_STATEMENT"
    });
  });
});
