"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("variableDeclarators", () => {
  it("single", () => {
    expect(Parser.parse("A", parser => parser.variableDeclarators())).to.eql({
      type: "VARIABLE_DECLARATORS",
      list: [
        {
          type: "VARIABLE_DECLARATOR",
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: {
              type: "IDENTIFIER",
              value: "A"
            },
            cntSquares: 0
          },
          init: undefined
        }
      ]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("A, B", parser => parser.variableDeclarators())).to.eql(
      {
        type: "VARIABLE_DECLARATORS",
        list: [
          {
            type: "VARIABLE_DECLARATOR",
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "A"
              },
              cntSquares: 0
            },
            init: undefined
          },
          {
            type: "VARIABLE_DECLARATOR",
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "B"
              },
              cntSquares: 0
            },
            init: undefined
          }
        ]
      }
    );
  });
});
