"use strict";
const Parser = require("../src/index");

describe("fieldDeclaration", () => {
  it("simple", () => {
    expect(
      Parser.parse("Abc def;", parser => parser.fieldDeclaration())
    ).toEqual({
      type: "FIELD_DECLARATION",
      typeType: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "CLASS_OR_INTERFACE_TYPE",
          elements: [
            {
              type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
              name: "Abc",
              typeArguments: undefined
            }
          ]
        },
        cntSquares: 0
      },
      variableDeclarators: {
        type: "VARIABLE_DECLARATORS",
        list: [
          {
            type: "VARIABLE_DECLARATOR",
            id: { type: "VARIABLE_DECLARATOR_ID", id: "def", cntSquares: 0 },
            init: undefined
          }
        ]
      }
    });
  });
});
