"use strict";
const Parser = require("../src/index");

describe("genericConstructorDeclaration", () => {
  it("simple", () => {
    expect(
      Parser.parse("<A> a() {}", parser =>
        parser.genericConstructorDeclaration()
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
