"use strict";
const Parser = require("../src/index");

describe("expression", () => {
  it("primary", () => {
    expect(Parser.parse("this", parser => parser.expression())).toEqual({
      type: "THIS"
    });
  });

  it("instanceofExpression", () => {
    expect(
      Parser.parse("this instanceof boolean", parser => parser.expression())
    ).toEqual({
      type: "INSTANCEOF_EXPRESSION",
      expression: {
        type: "THIS"
      },
      instanceof: {
        type: "TYPE_TYPE",
        annotations: [],
        value: { type: "PRIMITIVE_TYPE", value: "boolean" },
        cntSquares: 0
      }
    });
  });

  it("squareExpression", () => {
    expect(Parser.parse("this[super]", parser => parser.expression())).toEqual({
      type: "SQUARE_EXPRESSION",
      expression: {
        type: "THIS"
      },
      squareExpression: {
        type: "SUPER"
      }
    });
  });

  it("postfixExpression", () => {
    expect(Parser.parse("this++", parser => parser.expression())).toEqual({
      type: "POSTFIX_EXPRESSION",
      postfix: "++",
      expression: {
        type: "THIS"
      }
    });
  });

  it("ifElseExpression", () => {
    expect(
      Parser.parse("this ? super : null", parser => parser.expression())
    ).toEqual({
      type: "IF_ELSE_EXPRESSION",
      condition: {
        type: "THIS"
      },
      if: {
        type: "SUPER"
      },
      else: {
        type: "NULL"
      }
    });
  });

  it("qualifiedExpression", () => {
    expect(Parser.parse("this.a()", parser => parser.expression())).toEqual({
      type: "QUALIFIED_EXPRESSION",
      expression: {
        type: "THIS"
      },
      rest: {
        type: "METHOD_CALL",
        name: "a",
        parameters: undefined
      }
    });
  });

  it("operatorExpression Star", () => {
    expect(Parser.parse("this*super", parser => parser.expression())).toEqual({
      type: "OPERATOR_EXPRESSION",
      left: {
        type: "THIS"
      },
      operator: "*",
      right: {
        type: "SUPER"
      }
    });
  });

  it("multiple operatorExpressions", () => {
    expect(
      Parser.parse("this*super+null", parser => parser.expression())
    ).toEqual({
      type: "OPERATOR_EXPRESSION",
      left: {
        type: "THIS"
      },
      operator: "*",
      right: {
        type: "OPERATOR_EXPRESSION",
        left: {
          type: "SUPER"
        },
        operator: "+",
        right: {
          type: "NULL"
        }
      }
    });
  });

  it("PrefixExpression", () => {
    expect(Parser.parse("+this", parser => parser.expression())).toEqual({
      type: "PREFIX_EXPRESSION",
      prefix: "+",
      expression: {
        type: "THIS"
      }
    });
  });

  it("parExpression", () => {
    expect(Parser.parse("(this)", parser => parser.expression())).toEqual({
      type: "PAR_EXPRESSION",
      expression: {
        type: "THIS"
      }
    });
  });

  it("lambdaExpression: one identifier with parens", () => {
    expect(Parser.parse("(a) -> {}", parser => parser.expression())).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "IDENTIFIERS",
        identifiers: {
          type: "IDENTIFIER_LIST",
          identifiers: ["a"]
        }
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("lambdaExpression: one identifier without parens", () => {
    expect(Parser.parse("a -> {}", parser => parser.expression())).toEqual({
      type: "LAMBDA_EXPRESSION",
      parameters: {
        type: "IDENTIFIERS",
        identifiers: {
          type: "IDENTIFIER_LIST",
          identifiers: ["a"]
        }
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("methodReference: identifier", () => {
    expect(Parser.parse("B.C::A", parser => parser.expression())).toEqual({
      type: "METHOD_REFERENCE",
      reference: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "CLASS_OR_INTERFACE_TYPE",
          elements: [
            {
              type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
              typeArguments: undefined,
              name: "B"
            },
            {
              type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
              typeArguments: undefined,
              name: "C"
            }
          ]
        },
        cntSquares: 0
      },
      typeArguments: undefined,
      name: "A"
    });
  });
});
