"use strict";
const Parser = require("../src/index");

describe("dotIdentifierArguments", () => {
  it("without arguments", () => {
    expect(
      Parser.parse(".a", parser => parser.dotIdentifierArguments())
    ).toEqual({
      type: "DOT_IDENTIFIER_ARGUMENTS",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      arguments: undefined
    });
  });

  it("with arguments", () => {
    expect(
      Parser.parse(".a()", parser => parser.dotIdentifierArguments())
    ).toEqual({
      type: "DOT_IDENTIFIER_ARGUMENTS",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      arguments: {
        type: "ARGUMENTS"
      }
    });
  });
});
