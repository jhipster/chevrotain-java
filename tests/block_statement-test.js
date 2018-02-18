"use strict";
const Parser = require("../src/index");

const MismatchedTokenException = require("chevrotain").exceptions
  .MismatchedTokenException;

describe("blockStatement", () => {
  it("localVariableDeclaration: primitive", () => {
    expect(
      Parser.parse("boolean A;", parser => parser.blockStatement())
    ).toEqual({
      type: "LOCAL_VARIABLE_DECLARATION",
      modifiers: [],
      typeType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      declarators: {
        type: "VARIABLE_DECLARATORS",
        list: [
          {
            type: "VARIABLE_DECLARATOR",
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "A"
              },
              cntSquares: 0
            },
            init: undefined
          }
        ]
      }
    });
  });

  it("localVariableDeclaration: one modifier", () => {
    expect(
      Parser.parse("@Bean boolean A;", parser => parser.blockStatement())
    ).toEqual({
      type: "LOCAL_VARIABLE_DECLARATION",
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
      typeType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      declarators: {
        type: "VARIABLE_DECLARATORS",
        list: [
          {
            type: "VARIABLE_DECLARATOR",
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "A"
              },
              cntSquares: 0
            },
            init: undefined
          }
        ]
      }
    });
  });

  it("localVariableDeclaration: wrong modifier 'public'", () => {
    expect(() =>
      Parser.parse("public boolean A;", parser => parser.blockStatement())
    ).toThrow(MismatchedTokenException);
  });

  it("localVariableDeclaration: wrong modifier 'protected'", () => {
    expect(() =>
      Parser.parse("protected boolean A;", parser => parser.blockStatement())
    ).toThrow(MismatchedTokenException);
  });

  it("localVariableDeclaration: wrong modifier 'private'", () => {
    expect(() =>
      Parser.parse("private boolean A;", parser => parser.blockStatement())
    ).toThrow(MismatchedTokenException);
  });

  it("localVariableDeclaration: wrong modifier 'static'", () => {
    expect(() =>
      Parser.parse("static boolean A;", parser => parser.blockStatement())
    ).toThrow(MismatchedTokenException);
  });

  it("localVariableDeclaration: wrong modifier 'abstract'", () => {
    expect(() =>
      Parser.parse("abstract boolean A;", parser => parser.blockStatement())
    ).toThrow(MismatchedTokenException);
  });

  it("localVariableDeclaration: wrong modifier 'strictfp'", () => {
    expect(() =>
      Parser.parse("strictfp boolean A;", parser => parser.blockStatement())
    ).toThrow(MismatchedTokenException);
  });

  it("classDeclaration", () => {
    expect(
      Parser.parse("class A{}", parser => parser.blockStatement())
    ).toEqual({
      type: "LOCAL_TYPE_DECLARATION",
      modifiers: [],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        typeParameters: undefined,
        extends: undefined,
        implements: undefined,
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("localTypeDeclaration: interface", () => {
    expect(
      Parser.parse("interface A{}", parser => parser.blockStatement())
    ).toEqual({
      type: "LOCAL_TYPE_DECLARATION",
      modifiers: [],
      declaration: {
        type: "INTERFACE_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        typeParameters: undefined,
        typeList: undefined,
        body: {
          type: "INTERFACE_BODY",
          declarations: []
        }
      }
    });
  });

  it("localTypeDeclaration: class", () => {
    expect(
      Parser.parse("class A{}", parser => parser.blockStatement())
    ).toEqual({
      type: "LOCAL_TYPE_DECLARATION",
      modifiers: [],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        typeParameters: undefined,
        extends: undefined,
        implements: undefined,
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("localTypeDeclaration: one modifier", () => {
    expect(
      Parser.parse("public class A{}", parser => parser.blockStatement())
    ).toEqual({
      type: "LOCAL_TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "public"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        typeParameters: undefined,
        extends: undefined,
        implements: undefined,
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("localTypeDeclaration: multiple modifiers", () => {
    expect(
      Parser.parse("public static class A{}", parser => parser.blockStatement())
    ).toEqual({
      type: "LOCAL_TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "public"
        },
        {
          type: "MODIFIER",
          value: "static"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        typeParameters: undefined,
        extends: undefined,
        implements: undefined,
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("identifierStatement", () => {
    expect(Parser.parse("a:this;", parser => parser.blockStatement())).toEqual({
      type: "IDENTIFIER_STATEMENT",
      identifier: {
        type: "IDENTIFIER",
        value: "a"
      },
      statement: {
        type: "EXPRESSION_STATEMENT",
        expression: {
          type: "THIS"
        }
      }
    });
  });

  it("expressionStatement this", () => {
    expect(Parser.parse("this;", parser => parser.blockStatement())).toEqual({
      type: "EXPRESSION_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });

  it("expressionStatement this()", () => {
    expect(Parser.parse("this();", parser => parser.blockStatement())).toEqual({
      type: "EXPRESSION_STATEMENT",
      expression: {
        type: "THIS",
        arguments: {
          type: "EXPRESSION_LIST",
          list: []
        }
      }
    });
  });

  it('System.out.println("please work")', () => {
    expect(
      Parser.parse('System.out.println("please work");', parser =>
        parser.blockStatement()
      )
    ).toEqual({
      type: "EXPRESSION_STATEMENT",
      expression: {
        type: "QUALIFIED_EXPRESSION",
        expression: {
          type: "IDENTIFIER",
          value: "System"
        },
        rest: {
          type: "QUALIFIED_EXPRESSION",
          expression: {
            type: "IDENTIFIER",
            value: "out"
          },
          rest: {
            type: "METHOD_INVOCATION",
            name: {
              type: "IDENTIFIER",
              value: "println"
            },
            parameters: {
              type: "EXPRESSION_LIST",
              list: [
                {
                  type: "STRING_LITERAL",
                  value: '"please work"'
                }
              ]
            }
          }
        }
      }
    });
  });

  it("return ", () => {
    expect(
      Parser.parse("return this;", parser => parser.blockStatement())
    ).toEqual({
      type: "RETURN_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });
});
