"use strict";
const Parser = require("../src/index");

const MismatchedTokenException = require("chevrotain").exceptions
  .MismatchedTokenException;

describe("parExpressionOrCastExpressionOrLambdaExpression", () => {
  it("parExpression", () => {
    expect(
      Parser.parse("(this)", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "PAR_EXPRESSION",
      expression: {
        type: "THIS"
      }
    });
  });

  it("error: parExpression with annotation", () => {
    expect(() =>
      Parser.parse("(@Bean this)", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toThrow(MismatchedTokenException);
  });

  it("error: parExpression with typeArguments", () => {
    expect(() =>
      Parser.parse("(@Bean this<boolean>)", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toThrow(MismatchedTokenException);
  });

  it("error: parExpression with Squares", () => {
    expect(() =>
      Parser.parse("(@Bean this[])", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toThrow(MismatchedTokenException);
  });

  it("castExpression: primitiveType", () => {
    expect(
      Parser.parse("(boolean) this", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "CAST_EXPRESSION",
      castType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      expression: {
        type: "THIS"
      }
    });
  });

  it("castExpression: identifier", () => {
    expect(
      Parser.parse("(A) this", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "CAST_EXPRESSION",
      castType: {
        type: "IDENTIFIER",
        value: "A"
      },
      expression: { type: "THIS" }
    });
  });

  it("castExpression: identifier with typeArguments", () => {
    expect(
      Parser.parse("(A<B>) this", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "CAST_EXPRESSION",
      castType: {
        type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        typeArguments: {
          type: "TYPE_ARGUMENTS",
          value: {
            type: "TYPE_LIST",
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
        }
      },
      expression: { type: "THIS" }
    });
  });

  it("castExpression: annotation", () => {
    expect(
      Parser.parse("(@Bean A) this", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "CAST_EXPRESSION",
      castType: {
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
            values: undefined
          }
        ],
        dimensions: [],
        value: {
          type: "IDENTIFIER",
          value: "A"
        }
      },
      expression: { type: "THIS" }
    });
  });

  it("castExpression: one square", () => {
    expect(
      Parser.parse("(boolean[]) this", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "CAST_EXPRESSION",
      castType: {
        type: "TYPE_TYPE",
        modifiers: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        dimensions: [
          {
            type: "DIMENSION"
          }
        ]
      },
      expression: {
        type: "THIS"
      }
    });
  });

  it("castExpression: multiple squares", () => {
    expect(
      Parser.parse("(boolean[][]) this", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "CAST_EXPRESSION",
      castType: {
        type: "TYPE_TYPE",
        modifiers: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        dimensions: [
          {
            type: "DIMENSION"
          },
          {
            type: "DIMENSION"
          }
        ]
      },
      expression: {
        type: "THIS"
      }
    });
  });

  it("castExpression: followed by qualifiedExpressionRest and operatorExpressionRest", () => {
    expect(
      Parser.parse(
        "((LazyObject) obj).getIdentifier() == getIdentifier()",
        parser => parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "OPERATOR_EXPRESSION",
      left: {
        type: "QUALIFIED_EXPRESSION",
        expression: {
          type: "PAR_EXPRESSION",
          expression: {
            type: "CAST_EXPRESSION",
            castType: {
              type: "IDENTIFIER",
              value: "LazyObject"
            },
            expression: {
              type: "IDENTIFIER",
              value: "obj"
            }
          }
        },
        rest: {
          type: "METHOD_INVOCATION",
          name: {
            type: "IDENTIFIER",
            value: "getIdentifier"
          },
          parameters: undefined
        }
      },
      operator: "==",
      right: {
        type: "METHOD_INVOCATION",
        name: {
          type: "IDENTIFIER",
          value: "getIdentifier"
        },
        parameters: undefined
      }
    });
  });

  it("error castExpression: cast expression is not an identifier", () => {
    expect(() =>
      Parser.parse("(1+1) this", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toThrow(MismatchedTokenException);
  });

  it("lambdaExpression: empty parameters", () => {
    expect(
      Parser.parse("() -> {}", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "IDENTIFIERS",
        identifiers: undefined
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("lambdaExpression: one identifier with parens", () => {
    expect(
      Parser.parse("(a) -> {}", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "IDENTIFIERS",
        identifiers: {
          type: "IDENTIFIER_LIST",
          list: [
            {
              type: "IDENTIFIER",
              value: "a"
            }
          ]
        }
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("lambdaExpression: multiple identifiers", () => {
    expect(
      Parser.parse("(a, b) -> {}", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "IDENTIFIERS",
        identifiers: {
          type: "IDENTIFIER_LIST",
          list: [
            {
              type: "IDENTIFIER",
              value: "a"
            },
            {
              type: "IDENTIFIER",
              value: "b"
            }
          ]
        }
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("lambdaExpression: one formalParameter", () => {
    expect(
      Parser.parse("(boolean a) -> {}", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "FORMAL_PARAMETERS",
        parameters: [
          {
            modifiers: [],
            type: "FORMAL_PARAMETER",
            typeType: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "a"
              },
              dimensions: []
            },
            dotDotDot: false
          }
        ]
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("lambdaExpression: multiple formalParameters", () => {
    expect(
      Parser.parse("(boolean a, double b) -> {}", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "FORMAL_PARAMETERS",
        parameters: [
          {
            modifiers: [],
            type: "FORMAL_PARAMETER",
            typeType: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "a"
              },
              dimensions: []
            },
            dotDotDot: false
          },
          {
            modifiers: [],
            type: "FORMAL_PARAMETER",
            typeType: {
              type: "PRIMITIVE_TYPE",
              value: "double"
            },
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "b"
              },
              dimensions: []
            },
            dotDotDot: false
          }
        ]
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("lambdaExpression: final modifier", () => {
    expect(
      Parser.parse("(final boolean a) -> {}", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "FORMAL_PARAMETERS",
        parameters: [
          {
            modifiers: [
              {
                type: "MODIFIER",
                value: "final"
              }
            ],
            type: "FORMAL_PARAMETER",
            typeType: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "a"
              },
              dimensions: []
            },
            dotDotDot: false
          }
        ]
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("lambdaExpression: final only on the second", () => {
    expect(
      Parser.parse("(boolean a, final double b) -> {}", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "FORMAL_PARAMETERS",
        parameters: [
          {
            modifiers: [],
            type: "FORMAL_PARAMETER",
            typeType: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "a"
              },
              dimensions: []
            },
            dotDotDot: false
          },
          {
            modifiers: [
              {
                type: "MODIFIER",
                value: "final"
              }
            ],
            type: "FORMAL_PARAMETER",
            typeType: {
              type: "PRIMITIVE_TYPE",
              value: "double"
            },
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "b"
              },
              dimensions: []
            },
            dotDotDot: false
          }
        ]
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("parExpression with following operator expression", () => {
    expect(
      Parser.parse("(a - (b * c)) < d", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "OPERATOR_EXPRESSION",
      left: {
        type: "OPERATOR_EXPRESSION",
        left: {
          type: "IDENTIFIER",
          value: "a"
        },
        operator: "-",
        right: {
          type: "PAR_EXPRESSION",
          expression: {
            type: "OPERATOR_EXPRESSION",
            left: {
              type: "IDENTIFIER",
              value: "b"
            },
            operator: "*",
            right: { type: "IDENTIFIER", value: "c" }
          }
        }
      },
      operator: "<",
      right: { type: "IDENTIFIER", value: "d" }
    });
  });
});
