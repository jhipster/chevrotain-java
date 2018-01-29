"use strict";
const Parser = require("../src/index");

describe("genericMethodDeclaration", () => {
  it("simple", () => {
    expect(
      Parser.parse("<A> void a() {}", parser =>
        parser.genericMethodDeclaration()
      )
    ).toEqual({
      type: "GENERIC_METHOD_DECLARATION",
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
      methodDeclaration: {
        type: "METHOD_DECLARATION",
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
