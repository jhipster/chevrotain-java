"use strict";
const Parser = require("../src/index");

describe("identifierName", () => {
  it("one element", () => {
    expect(Parser.parse("a", parser => parser.identifierName())).toEqual({
      type: "IDENTIFIER_NAME",
      elements: [
        {
          type: "IDENTIFIER_NAME_ELEMENT",
          id: "a",
          typeArguments: undefined
        }
      ]
    });
  });

  it("two elements", () => {
    expect(Parser.parse("a.b", parser => parser.identifierName())).toEqual({
      type: "IDENTIFIER_NAME",
      elements: [
        {
          type: "IDENTIFIER_NAME_ELEMENT",
          id: "a",
          typeArguments: undefined
        },
        {
          type: "IDENTIFIER_NAME_ELEMENT",
          id: "b",
          typeArguments: undefined
        }
      ]
    });
  });
});
