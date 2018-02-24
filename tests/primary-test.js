"use strict";
const Parser = require("../src/index");

describe("primary", () => {
  it("this", () => {
    expect(Parser.parse("this", parser => parser.primary())).toEqual({
      type: "THIS"
    });
  });

  it("this invocation", () => {
    expect(Parser.parse("this()", parser => parser.primary())).toEqual({
      type: "THIS",
      arguments: {
        type: "EXPRESSION_LIST",
        list: []
      }
    });
  });

  it("super", () => {
    expect(Parser.parse("super", parser => parser.primary())).toEqual({
      type: "SUPER"
    });
  });

  it("super invocation", () => {
    expect(Parser.parse("super()", parser => parser.primary())).toEqual({
      type: "SUPER",
      arguments: {
        type: "EXPRESSION_LIST",
        list: []
      }
    });
  });

  it("floatLiteral", () => {
    expect(Parser.parse("0.1", parser => parser.primary())).toEqual({
      type: "FLOAT_LITERAL",
      value: "0.1"
    });
  });

  it("void", () => {
    expect(Parser.parse("void", parser => parser.primary())).toEqual({
      type: "VOID"
    });
  });

  it("identifier", () => {
    expect(Parser.parse("A", parser => parser.primary())).toEqual({
      type: "IDENTIFIER",
      value: "A"
    });
  });

  it("identifier with typeArguments", () => {
    expect(Parser.parse("A<B>", parser => parser.primary())).toEqual({
      type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      typeArguments: {
        type: "TYPE_ARGUMENTS",
        list: [
          {
            type: "TYPE_ARGUMENT",
            argument: {
              type: "IDENTIFIER",
              value: "B"
            },
            extends: undefined,
            super: undefined
          }
        ]
      }
    });
  });

  it("genericInvocation", () => {
    expect(
      Parser.parse("<boolean> this()", parser => parser.primary())
    ).toEqual({
      type: "GENERIC_INVOCATION",
      typeArguments: {
        type: "NON_WILDCARD_TYPE_ARGUMENTS",
        typeList: {
          type: "TYPE_LIST",
          list: [
            {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            }
          ]
        }
      },
      arguments: {
        type: "THIS",
        arguments: {
          type: "EXPRESSION_LIST",
          list: []
        }
      }
    });
  });

  it("identifier with annotation", () => {
    expect(Parser.parse("@Bean A", parser => parser.expression())).toEqual({
      type: "TYPE_TYPE",
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
      value: {
        type: "IDENTIFIER",
        value: "A"
      },
      dimensions: []
    });
  });
});
