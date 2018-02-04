"use strict";
const Parser = require("../src/index");

describe("genericMethodDeclarationOrGenericConstructorDeclaration", () => {
  it("genericMethodDeclaration: simple", () => {
    expect(
      Parser.parse("<A> void a() {}", parser =>
        parser.genericMethodDeclarationOrGenericConstructorDeclaration()
      )
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

  it("genericConstructorDeclaration: simple", () => {
    expect(
      Parser.parse("<A> a() {}", parser =>
        parser.genericMethodDeclarationOrGenericConstructorDeclaration()
      )
    ).toEqual({
      type: "GENERIC_CONSTRUCTOR_DECLARATION",
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
      constructorDeclaration: {
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
    });
  });
});
