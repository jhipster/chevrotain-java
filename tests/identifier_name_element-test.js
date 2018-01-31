"use strict";
const Parser = require("../src/index");

describe("identifierNameElement", () => {
  it("without typeArguments", () => {
    expect(Parser.parse("a", parser => parser.identifierNameElement())).toEqual(
      {
        type: "IDENTIFIER_NAME_ELEMENT",
        id: "a",
        typeArguments: undefined
      }
    );
  });

  it("with typeArguments", () => {
    expect(
      Parser.parse("a<>", parser => parser.identifierNameElement())
    ).toEqual({
      type: "IDENTIFIER_NAME_ELEMENT",
      id: "a",
      typeArguments: {
        type: "EMPTY_DIAMOND"
      }
    });
  });
});
