"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("fieldDeclaration", () => {
  it("simple", () => {
    expect(
      Parser.parse("Abc def;", parser => parser.fieldDeclaration())
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
