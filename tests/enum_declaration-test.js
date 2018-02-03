"use strict";
const Parser = require("../src/index");

describe("enum", () => {
  it("empty", () => {
    expect(
      Parser.parse("enum A{}", parser => parser.enumDeclaration())
    ).toEqual({
      type: "ENUM_DECLARATION",
      name: "A",
      implements: undefined,
      enumConstants: undefined,
      body: undefined
    });
  });

  it("implements", () => {
    expect(
      Parser.parse("enum A implements Something{}", parser =>
        parser.enumDeclaration()
      )
    ).toEqual({
      type: "ENUM_DECLARATION",
      name: "A",
      implements: {
        type: "TYPE_LIST",
        list: [
          {
            type: "IDENTIFIER",
            value: "Something"
          }
        ]
      },
      enumConstants: undefined,
      body: undefined
    });
  });

  it("enumConstants", () => {
    expect(
      Parser.parse("enum A{B}", parser => parser.enumDeclaration())
    ).toEqual({
      type: "ENUM_DECLARATION",
      name: "A",
      implements: undefined,
      enumConstants: {
        type: "ENUM_CONSTANTS",
        list: [
          {
            type: "ENUM_CONSTANT",
            modifiers: [],
            name: "B",
            arguments: undefined,
            body: undefined
          }
        ]
      },
      body: undefined
    });
  });

  it("enumConstants with comma at the end", () => {
    expect(
      Parser.parse("enum A{B,}", parser => parser.enumDeclaration())
    ).toEqual({
      type: "ENUM_DECLARATION",
      name: "A",
      implements: undefined,
      enumConstants: {
        type: "ENUM_CONSTANTS",
        list: [
          {
            type: "ENUM_CONSTANT",
            modifiers: [],
            name: "B",
            arguments: undefined,
            body: undefined
          }
        ]
      },
      body: undefined
    });
  });

  it("enumBodyDeclarations", () => {
    expect(
      Parser.parse("enum A{; void a() {}}", parser => parser.enumDeclaration())
    ).toEqual({
      type: "ENUM_DECLARATION",
      name: "A",
      implements: undefined,
      enumConstants: undefined,
      body: {
        type: "ENUM_BODY_DECLARATIONS",
        declarations: [
          {
            type: "CLASS_BODY_MEMBER_DECLARATION",
            modifiers: [],
            declaration: {
              type: "METHOD_DECLARATION",
              typeType: {
                type: "VOID"
              },
              name: "a",
              parameters: {
                type: "FORMAL_PARAMETERS",
                parameters: undefined
              },
              cntSquares: 0,
              throws: undefined,
              body: {
                type: "BLOCK",
                statements: []
              }
            }
          }
        ]
      }
    });
  });

  it("enumConstants with comma && enumBodyDeclarations", () => {
    expect(
      Parser.parse("enum A{B,; void a() {}}", parser =>
        parser.enumDeclaration()
      )
    ).toEqual({
      type: "ENUM_DECLARATION",
      name: "A",
      implements: undefined,
      enumConstants: {
        type: "ENUM_CONSTANTS",
        list: [
          {
            type: "ENUM_CONSTANT",
            modifiers: [],
            name: "B",
            arguments: undefined,
            body: undefined
          }
        ]
      },
      body: {
        type: "ENUM_BODY_DECLARATIONS",
        declarations: [
          {
            type: "CLASS_BODY_MEMBER_DECLARATION",
            modifiers: [],
            declaration: {
              type: "METHOD_DECLARATION",
              typeType: {
                type: "VOID"
              },
              name: "a",
              parameters: {
                type: "FORMAL_PARAMETERS",
                parameters: undefined
              },
              cntSquares: 0,
              throws: undefined,
              body: {
                type: "BLOCK",
                statements: []
              }
            }
          }
        ]
      }
    });
  });
});
