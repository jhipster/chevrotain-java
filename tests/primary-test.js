"use strict";
const Parser = require("../src/index");

describe("primary", () => {
  it("this", () => {
    expect(Parser.parse("this", parser => parser.primary())).toEqual({
      type: "THIS"
    });
  });

  it("super", () => {
    expect(Parser.parse("super", parser => parser.primary())).toEqual({
      type: "SUPER"
    });
  });

  it("floatLiteral", () => {
    expect(Parser.parse("0.1", parser => parser.primary())).toEqual({
      type: "FLOAT_LITERAL",
      value: "0.1"
    });
  });

  it("identifier", () => {
    expect(Parser.parse("A", parser => parser.primary())).toEqual("A");
  });

  it("typeTypeOrVoidDotClass", () => {
    expect(Parser.parse("void.class", parser => parser.primary())).toEqual({
      type: "TYPE_TYPE_OR_VOID_DOT_CLASS",
      typeTypeOrVoid: {
        type: "VOID"
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
              type: "TYPE_TYPE",
              annotations: [],
              value: {
                type: "PRIMITIVE_TYPE",
                value: "boolean"
              },
              cntSquares: 0
            }
          ]
        }
      },
      arguments: {
        type: "THIS_ARGUMENTS",
        arguments: {
          type: "ARGUMENTS"
        }
      }
    });
  });

  it("parExpression", () => {
    expect(Parser.parse("(this)", parser => parser.primary())).toEqual({
      type: "PAR_EXPRESSION",
      expression: {
        type: "THIS"
      }
    });
  });
});
