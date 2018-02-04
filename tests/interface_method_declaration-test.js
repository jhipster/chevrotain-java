"use strict";
const Parser = require("../src/index");

describe("interfaceMethodDeclaration", () => {
  it("void", () => {
    expect(
      Parser.parse("void a() {}", parser => parser.interfaceMethodDeclaration())
    ).toEqual({
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

  it("one modifier", () => {
    expect(
      Parser.parse("public void a() {}", parser =>
        parser.interfaceMethodDeclaration()
      )
    ).toEqual({
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

  it("multiple modifier", () => {
    expect(
      Parser.parse("public static void a() {}", parser =>
        parser.interfaceMethodDeclaration()
      )
    ).toEqual({
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

  it("typeParameter", () => {
    expect(
      Parser.parse("<Abc> void a() {}", parser =>
        parser.interfaceMethodDeclaration()
      )
    ).toEqual({
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

  it("single square", () => {
    expect(
      Parser.parse("void a()[] {}", parser =>
        parser.interfaceMethodDeclaration()
      )
    ).toEqual({
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

  it("multiple squares", () => {
    expect(
      Parser.parse("void a()[][] {}", parser =>
        parser.interfaceMethodDeclaration()
      )
    ).toEqual({
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

  it("throws", () => {
    expect(
      Parser.parse("void a() throws Something {}", parser =>
        parser.interfaceMethodDeclaration()
      )
    ).toEqual({
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
});
