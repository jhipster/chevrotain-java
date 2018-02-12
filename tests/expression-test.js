"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("expression", () => {
  it("primary", () => {
    expect(Parser.parse("this", parser => parser.expression())).to.eql({
      type: "THIS"
    });
  });

  it("identifier", () => {
    expect(Parser.parse("abc", parser => parser.expression())).to.eql({
      type: "IDENTIFIER",
      value: "abc"
    });
  });

  it("instanceofExpression", () => {
    expect(
      Parser.parse("this instanceof boolean", parser => parser.expression())
    ).to.eql({
      type: "INSTANCEOF_EXPRESSION",
      expression: {
        type: "THIS"
      },
      instanceof: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      }
    });
  });

  it("squareExpression", () => {
    expect(Parser.parse("this[super]", parser => parser.expression())).to.eql({
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
    expect(Parser.parse("this++", parser => parser.expression())).to.eql({
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
    ).to.eql({
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
    expect(Parser.parse("this.a()", parser => parser.expression())).to.eql({
      type: "QUALIFIED_EXPRESSION",
      expression: {
        type: "THIS"
      },
      rest: {
        type: "METHOD_CALL",
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        parameters: undefined
      }
    });
  });

  it("operatorExpression Star", () => {
    expect(Parser.parse("this*super", parser => parser.expression())).to.eql({
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
    ).to.eql({
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
    expect(Parser.parse("+this", parser => parser.expression())).to.eql({
      type: "PREFIX_EXPRESSION",
      prefix: "+",
      expression: {
        type: "THIS"
      }
    });
  });

  it("parExpression", () => {
    expect(Parser.parse("(this)", parser => parser.expression())).to.eql({
      type: "PAR_EXPRESSION",
      expression: {
        type: "THIS"
      }
    });
  });

  it("lambdaExpression: one identifier with parens", () => {
    expect(Parser.parse("(a) -> {}", parser => parser.expression())).to.eql({
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

  it("lambdaExpression: one identifier without parens", () => {
    expect(Parser.parse("a -> {}", parser => parser.expression())).to.eql({
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

  it("methodReference: identifier", () => {
    expect(Parser.parse("B.C::A", parser => parser.expression())).to.eql({
      type: "METHOD_REFERENCE",
      reference: {
        type: "CLASS_OR_INTERFACE_TYPE",
        elements: [
          {
            type: "IDENTIFIER",
            value: "B"
          },
          {
            type: "IDENTIFIER",
            value: "C"
          }
        ]
      },
      typeArguments: undefined,
      name: {
        type: "IDENTIFIER",
        value: "A"
      }
    });
  });
});
