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
          arguments: [
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
        annotations: [
          {
            type: "ANNOTATION",
            name: {
              type: "QUALIFIED_NAME",
              name: ["Bean"]
            },
            hasBraces: false,
            value: undefined
          }
        ],
        cntSquares: 0,
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
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 1
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
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 2
      },
      expression: {
        type: "THIS"
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
          identifiers: [
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
          identifiers: [
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
        parameters: {
          type: "FORMAL_PARAMETER_LIST",
          formalParameters: [
            {
              modifiers: [],
              type: "FORMAL_PARAMETER",
              typeType: {
                type: "PRIMITIVE_TYPE",
                value: "boolean"
              },
              id: {
                type: "VARIABLE_DECLARATOR_ID",
                id: "a",
                cntSquares: 0
              },
              dotDotDot: false
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

  it("lambdaExpression: multiple formalParameters", () => {
    expect(
      Parser.parse("(boolean a, double b) -> {}", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "FORMAL_PARAMETERS",
        parameters: {
          type: "FORMAL_PARAMETER_LIST",
          formalParameters: [
            {
              modifiers: [],
              type: "FORMAL_PARAMETER",
              typeType: {
                type: "PRIMITIVE_TYPE",
                value: "boolean"
              },
              id: {
                type: "VARIABLE_DECLARATOR_ID",
                id: "a",
                cntSquares: 0
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
                id: "b",
                cntSquares: 0
              },
              dotDotDot: false
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

  it("lambdaExpression: one annotation", () => {
    expect(() =>
      Parser.parse("(@Bean boolean a) -> {}", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toThrow(MismatchedTokenException);
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
        parameters: {
          type: "FORMAL_PARAMETER_LIST",
          formalParameters: [
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
                id: "a",
                cntSquares: 0
              },
              dotDotDot: false
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

  it("lambdaExpression: final only on the second", () => {
    expect(
      Parser.parse("(boolean a, final double b) -> {}", parser =>
        parser.parExpressionOrCastExpressionOrLambdaExpression()
      )
    ).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "FORMAL_PARAMETERS",
        parameters: {
          type: "FORMAL_PARAMETER_LIST",
          formalParameters: [
            {
              modifiers: [],
              type: "FORMAL_PARAMETER",
              typeType: {
                type: "PRIMITIVE_TYPE",
                value: "boolean"
              },
              id: {
                type: "VARIABLE_DECLARATOR_ID",
                id: "a",
                cntSquares: 0
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
                id: "b",
                cntSquares: 0
              },
              dotDotDot: false
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
});
