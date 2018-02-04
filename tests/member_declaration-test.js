"use strict";
const Parser = require("../src/index");

describe("memberDeclaration", () => {
  it("methodDeclaration", () => {
    expect(
      Parser.parse("void a() {}", parser => parser.memberDeclaration())
    ).toEqual({
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
    expect(
      Parser.parse("a() {}", parser => parser.memberDeclaration())
    ).toEqual({
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
    });
  });

  it("interfaceDeclaration", () => {
    expect(
      Parser.parse("interface A{}", parser => parser.memberDeclaration())
    ).toEqual({
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
    ).toEqual({
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
    ).toEqual({
      type: "CLASS_DECLARATION",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      body: {
        type: "CLASS_BODY",
        declarations: []
      }
    });
  });

  it("enumDeclaration", () => {
    expect(
      Parser.parse("enum A{}", parser => parser.memberDeclaration())
    ).toEqual({
      type: "ENUM_DECLARATION",
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
    ).toEqual({
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
});
