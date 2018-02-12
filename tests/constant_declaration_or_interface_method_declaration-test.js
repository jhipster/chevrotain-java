"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("constantDeclarationOrInterfaceMethodDeclaration", () => {
  it("interfaceMethodDeclaration: void", () => {
    expect(
      Parser.parse("void a() {}", parser =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).to.eql({
      type: "INTERFACE_METHOD_DECLARATION",
      modifiers: [],
      typeParameters: undefined,
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

  it("interfaceMethodDeclaration: one modifier", () => {
    expect(
      Parser.parse("public void a() {}", parser =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).to.eql({
      type: "INTERFACE_METHOD_DECLARATION",
      modifiers: [{ type: "MODIFIER", value: "public" }],
      typeParameters: undefined,
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

  it("interfaceMethodDeclaration: multiple modifier", () => {
    expect(
      Parser.parse("public static void a() {}", parser =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).to.eql({
      type: "INTERFACE_METHOD_DECLARATION",
      modifiers: [
        { type: "MODIFIER", value: "public" },
        { type: "MODIFIER", value: "static" }
      ],
      typeParameters: undefined,
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

  it("interfaceMethodDeclaration: typeParameter", () => {
    expect(
      Parser.parse("<Abc> void a() {}", parser =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).to.eql({
      type: "INTERFACE_METHOD_DECLARATION",
      modifiers: [],
      typeParameters: {
        type: "TYPE_PARAMETERS",
        parameters: [
          {
            type: "TYPE_PARAMETER",
            annotations: [],
            name: {
              type: "IDENTIFIER",
              value: "Abc"
            },
            typeBound: undefined
          }
        ]
      },
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

  it("interfaceMethodDeclaration: single square", () => {
    expect(
      Parser.parse("void a()[] {}", parser =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).to.eql({
      type: "INTERFACE_METHOD_DECLARATION",
      modifiers: [],
      typeParameters: undefined,
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

  it("interfaceMethodDeclaration: multiple squares", () => {
    expect(
      Parser.parse("void a()[][] {}", parser =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).to.eql({
      type: "INTERFACE_METHOD_DECLARATION",
      modifiers: [],
      typeParameters: undefined,
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

  it("interfaceMethodDeclaration: throws", () => {
    expect(
      Parser.parse("void a() throws Something {}", parser =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).to.eql({
      type: "INTERFACE_METHOD_DECLARATION",
      modifiers: [],
      typeParameters: undefined,
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

  it("genericInterfaceMethodDeclaration: simple", () => {
    expect(
      Parser.parse("<A> void a() {}", parser =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).to.eql({
      type: "INTERFACE_METHOD_DECLARATION",
      modifiers: [],
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

  it("constantDeclaration: single declaration", () => {
    expect(
      Parser.parse("boolean A = this;", parser =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).to.eql({
      type: "CONSTANT_DECLARATION",
      typeType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      declarators: [
        {
          type: "CONSTANT_DECLARATOR",
          name: {
            type: "IDENTIFIER",
            value: "A"
          },
          cntSquares: 0,
          init: {
            type: "THIS"
          }
        }
      ]
    });
  });

  it("constantDeclaration: mutiple declarations", () => {
    expect(
      Parser.parse("boolean A = this, B = super;", parser =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).to.eql({
      type: "CONSTANT_DECLARATION",
      typeType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      declarators: [
        {
          type: "CONSTANT_DECLARATOR",
          name: {
            type: "IDENTIFIER",
            value: "A"
          },
          cntSquares: 0,
          init: {
            type: "THIS"
          }
        },
        {
          type: "CONSTANT_DECLARATOR",
          name: {
            type: "IDENTIFIER",
            value: "B"
          },
          cntSquares: 0,
          init: {
            type: "SUPER"
          }
        }
      ]
    });
  });
});
