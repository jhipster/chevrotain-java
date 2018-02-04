"use strict";
const Parser = require("../src/index");

describe("memberDeclaration", () => {
  it("methodDeclaration: void", () => {
    expect(
      Parser.parse("void a() {}", parser =>
        parser.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration()
      )
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

  it("methodDeclaration: identifier", () => {
    expect(
      Parser.parse("A a() {}", parser =>
        parser.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration()
      )
    ).toEqual({
      type: "METHOD_DECLARATION",
      typeType: {
        type: "IDENTIFIER",
        value: "A"
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

  it("methodDeclaration: identifier with dims", () => {
    expect(
      Parser.parse("A[] a() {}", parser =>
        parser.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration()
      )
    ).toEqual({
      type: "METHOD_DECLARATION",
      typeType: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "IDENTIFIER",
          value: "A"
        },
        cntSquares: 1
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

  it("methodDeclaration: identifier with typeArgument", () => {
    expect(
      Parser.parse("A<B> a() {}", parser =>
        parser.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration()
      )
    ).toEqual({
      type: "METHOD_DECLARATION",
      typeType: {
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

  it("methodDeclaration: typeParameter", () => {
    expect(
      Parser.parse("boolean a() {}", parser =>
        parser.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration()
      )
    ).toEqual({
      type: "METHOD_DECLARATION",
      typeType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
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

  it("methodDeclaration: single square", () => {
    expect(
      Parser.parse("void a()[] {}", parser =>
        parser.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration()
      )
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
      cntSquares: 1,
      throws: undefined,
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("methodDeclaration: multiple squares", () => {
    expect(
      Parser.parse("void a()[][] {}", parser =>
        parser.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration()
      )
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
      cntSquares: 2,
      throws: undefined,
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("methodDeclaration: throws", () => {
    expect(
      Parser.parse("void a() throws Something {}", parser =>
        parser.methodDeclaration()
      )
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
      throws: {
        type: "QUALIFIED_NAME_LIST",
        list: [
          {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Something"
              }
            ]
          }
        ]
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("constructorDeclaration: simple", () => {
    expect(
      Parser.parse("a() {}", parser =>
        parser.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration()
      )
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

  it("constructorDeclaration: throws", () => {
    expect(
      Parser.parse("a() throws Something {}", parser =>
        parser.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration()
      )
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
      throws: {
        type: "QUALIFIED_NAME_LIST",
        list: [
          {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Something"
              }
            ]
          }
        ]
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("fieldDeclaration: simple", () => {
    expect(
      Parser.parse("Abc def;", parser =>
        parser.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration()
      )
    ).toEqual({
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
