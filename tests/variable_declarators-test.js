"use strict";
const Parser = require("../src/index");

describe("variableDeclarators", () => {
  it("single", () => {
    expect(Parser.parse("A", parser => parser.variableDeclarators())).toEqual({
      type: "VARIABLE_DECLARATORS",
      list: [
        {
          type: "VARIABLE_DECLARATOR",
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "A",
            cntSquares: 0
          },
          init: undefined
        }
      ]
    });
  });

  it("multiple", () => {
    expect(
      Parser.parse("A, B", parser => parser.variableDeclarators())
    ).toEqual({
      type: "VARIABLE_DECLARATORS",
      list: [
        {
          type: "VARIABLE_DECLARATOR",
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "A",
            cntSquares: 0
          },
          init: undefined
        },
        {
          type: "VARIABLE_DECLARATOR",
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "B",
            cntSquares: 0
          },
          init: undefined
        }
      ]
    });
  });
});
