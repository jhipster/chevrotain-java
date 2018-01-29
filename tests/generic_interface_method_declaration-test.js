"use strict";
const Parser = require("../src/index");

describe("genericInterfaceMethodDeclaration", () => {
  it("simple", () => {
    expect(
      Parser.parse("<A> void a() {}", parser =>
        parser.genericInterfaceMethodDeclaration()
      )
    ).toEqual({
      type: "GENERIC_INTERFACE_METHOD_DECLARATION",
      typeParameters: {
        type: "TYPE_PARAMETERS",
        parameters: [
          {
            type: "TYPE_PARAMETER",
            annotations: [],
            name: "A",
            typeBound: undefined
          }
        ]
      },
      interfaceMethodDeclaration: {
        type: "INTERFACE_METHOD_DECLARATION",
        modifiers: [],
        typeParameters: undefined,
        typeType: {
          type: "VOID"
        },
        name: "a",
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
