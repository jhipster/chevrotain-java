"use strict";
const Parser = require("../src/index");

describe("enumConstant", () => {
  it("identifier", () => {
    expect(Parser.parse("A", parser => parser.enumConstant())).toEqual({
      type: "ENUM_CONSTANT",
      modifiers: [],
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      arguments: undefined,
      body: undefined
    });
  });

  it("one annotation", () => {
    expect(Parser.parse("@Bean A", parser => parser.enumConstant())).toEqual({
      type: "ENUM_CONSTANT",
      modifiers: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Bean"
              }
            ]
          },
          hasBraces: false,
          value: undefined
        }
      ],
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      arguments: undefined,
      body: undefined
    });
  });

  it("multiple annotations", () => {
    expect(
      Parser.parse("@Bean @Something A", parser => parser.enumConstant())
    ).toEqual({
      type: "ENUM_CONSTANT",
      modifiers: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Bean"
              }
            ]
          },
          hasBraces: false,
          value: undefined
        },
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Something"
              }
            ]
          },
          hasBraces: false,
          value: undefined
        }
      ],
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      arguments: undefined,
      body: undefined
    });
  });

  it("arguments", () => {
    expect(Parser.parse("A()", parser => parser.enumConstant())).toEqual({
      type: "ENUM_CONSTANT",
      modifiers: [],
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      arguments: {
        type: "EXPRESSION_LIST",
        list: []
      },
      body: undefined
    });
  });

  it("body", () => {
    expect(Parser.parse("A {}", parser => parser.enumConstant())).toEqual({
      type: "ENUM_CONSTANT",
      modifiers: [],
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      arguments: undefined,
      body: {
        type: "CLASS_BODY",
        declarations: []
      }
    });
  });
});
