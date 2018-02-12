"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("memberDeclaration", () => {
  it("methodDeclaration", () => {
    expect(
      Parser.parse("void a() {}", parser => parser.memberDeclaration())
    ).to.eql({
      type: "METHOD_DECLARATION",
      typeType: {
        type: "VOID"
      },
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
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
    });
  });

  it("constructorDeclaration", () => {
    expect(Parser.parse("a() {}", parser => parser.memberDeclaration())).to.eql(
      {
        type: "CONSTRUCTOR_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        parameters: {
          type: "FORMAL_PARAMETERS",
          parameters: undefined
        },
        throws: undefined,
        body: {
          type: "BLOCK",
          statements: []
        }
      }
    );
  });

  it("interfaceDeclaration", () => {
    expect(
      Parser.parse("interface A{}", parser => parser.memberDeclaration())
    ).to.eql({
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
    });
  });

  it("annotationTypeDeclaration", () => {
    expect(
      Parser.parse("@interface A{}", parser => parser.memberDeclaration())
    ).to.eql({
      type: "ANNOTATION_TYPE_DECLARATION",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      body: {
        type: "ANNOTATION_TYPE_BODY",
        declarations: []
      }
    });
  });

  it("classDeclaration", () => {
    expect(
      Parser.parse("class A{}", parser => parser.memberDeclaration())
    ).to.eql({
      type: "CLASS_DECLARATION",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      body: {
        type: "CLASS_BODY",
        declarations: []
      },
      extends: undefined,
      implements: undefined,
      typeParameters: undefined
    });
  });

  it("enumDeclaration", () => {
    expect(
      Parser.parse("enum A{}", parser => parser.memberDeclaration())
    ).to.eql({
      type: "ENUM_DECLARATION",
      body: undefined,
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      implements: undefined,
      enumConstants: undefined
    });
  });

  it("genericMethodDeclarationOrGenericConstructorDeclaration", () => {
    expect(
      Parser.parse("<A> void a() {}", parser => parser.memberDeclaration())
    ).to.eql({
      type: "GENERIC_METHOD_DECLARATION",
      typeParameters: {
        type: "TYPE_PARAMETERS",
        parameters: [
          {
            type: "TYPE_PARAMETER",
            annotations: [],
            name: {
              type: "IDENTIFIER",
              value: "A"
            },
            typeBound: undefined
          }
        ]
      },
      methodDeclaration: {
        type: "METHOD_DECLARATION",
        typeType: {
          type: "VOID"
        },
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
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
    });
  });

  it("fieldDeclaration", () => {
    expect(
      Parser.parse("Abc def;", parser => parser.memberDeclaration())
    ).to.eql({
      type: "FIELD_DECLARATION",
      typeType: {
        type: "IDENTIFIER",
        value: "Abc"
      },
      variableDeclarators: {
        type: "VARIABLE_DECLARATORS",
        list: [
          {
            type: "VARIABLE_DECLARATOR",
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "def"
              },
              cntSquares: 0
            },
            init: undefined
          }
        ]
      }
    });
  });
});
