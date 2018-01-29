"use strict";
const Parser = require("../src/index");

describe("constructorDeclaration", () => {
  it("simple", () => {
    expect(
      Parser.parse("a() {}", parser => parser.constructorDeclaration())
    ).toEqual({
      type: "CONSTRUCTOR_DECLARATION",
      name: "a",
      parameters: {
        type: "FORMAL_PARAMETERS",
        parameters: undefined
      },
      throws: undefined,
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("throws", () => {
    expect(
      Parser.parse("a() throws Something {}", parser =>
        parser.constructorDeclaration()
      )
    ).toEqual({
      type: "CONSTRUCTOR_DECLARATION",
      name: "a",
      parameters: {
        type: "FORMAL_PARAMETERS",
        parameters: undefined
      },
      throws: {
        type: "QUALIFIED_NAME_LIST",
        list: [
          {
            type: "QUALIFIED_NAME",
            name: ["Something"]
          }
        ]
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });
});
