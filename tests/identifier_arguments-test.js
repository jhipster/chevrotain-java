"use strict";
const Parser = require("../src/index");

describe("identifierArguments", () => {
  it("simple", () => {
    expect(Parser.parse("a()", parser => parser.identifierArguments())).toEqual(
      {
        type: "IDENTIFIER_ARGUMENTS",
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        arguments: {
          type: "EXPRESSION_LIST",
          list: []
        }
      }
    );
  });
});
