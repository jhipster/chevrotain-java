"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("blockStatement", () => {
  it("localVariableDeclaration: primitive", () => {
    expect(
      Parser.parse("boolean A;", parser => parser.blockStatement())
    ).to.eql({
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
    ).to.eql({
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
    ).to.throw(
      "Locale variable declaration can't have a public, protected, private, static, abstract or strictfp modifier."
    );
  });

  it("localVariableDeclaration: wrong modifier 'protected'", () => {
    expect(() =>
      Parser.parse("protected boolean A;", parser => parser.blockStatement())
    ).to.throw(
      "Locale variable declaration can't have a public, protected, private, static, abstract or strictfp modifier."
    );
  });

  it("localVariableDeclaration: wrong modifier 'private'", () => {
    expect(() =>
      Parser.parse("private boolean A;", parser => parser.blockStatement())
    ).to.throw(
      "Locale variable declaration can't have a public, protected, private, static, abstract or strictfp modifier."
    );
  });

  it("localVariableDeclaration: wrong modifier 'static'", () => {
    expect(() =>
      Parser.parse("static boolean A;", parser => parser.blockStatement())
    ).to.throw(
      "Locale variable declaration can't have a public, protected, private, static, abstract or strictfp modifier."
    );
  });

  it("localVariableDeclaration: wrong modifier 'abstract'", () => {
    expect(() =>
      Parser.parse("abstract boolean A;", parser => parser.blockStatement())
    ).to.throw(
      "Locale variable declaration can't have a public, protected, private, static, abstract or strictfp modifier."
    );
  });

  it("localVariableDeclaration: wrong modifier 'strictfp'", () => {
    expect(() =>
      Parser.parse("strictfp boolean A;", parser => parser.blockStatement())
    ).to.throw(
      "Locale variable declaration can't have a public, protected, private, static, abstract or strictfp modifier."
    );
  });

  it("classDeclaration", () => {
    expect(Parser.parse("class A{}", parser => parser.blockStatement())).to.eql(
      {
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
      }
    );
  });

  it("localTypeDeclaration: interface", () => {
    expect(
      Parser.parse("interface A{}", parser => parser.blockStatement())
    ).to.eql({
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
    expect(Parser.parse("class A{}", parser => parser.blockStatement())).to.eql(
      {
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
      }
    );
  });

  it("localTypeDeclaration: one modifier", () => {
    expect(
      Parser.parse("public class A{}", parser => parser.blockStatement())
    ).to.eql({
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
    ).to.eql({
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
    expect(Parser.parse("a:this;", parser => parser.blockStatement())).to.eql({
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

  it("expressionStatement", () => {
    expect(Parser.parse("this;", parser => parser.blockStatement())).to.eql({
      type: "EXPRESSION_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });
});
