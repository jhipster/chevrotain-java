"use strict";
const Parser = require("../src/index");

describe("switchBlockStatementGroup", () => {
  it("single", () => {
    expect(
      Parser.parse("case a: boolean A;", parser =>
        parser.switchBlockStatementGroup()
      )
    ).toEqual({
      type: "SWITCH_BLOCK_STATEMENT_GROUP",
      labels: [
        {
          type: "SWITCH_LABEL_CASE",
          expression: {
            type: "IDENTIFIER",
            value: "a"
          }
        }
      ],
      statements: [
        {
          type: "LOCAL_VARIABLE_DECLARATION",
          modifiers: [],
          typeType: {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          },
          declarators: {
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
          }
        }
      ]
    });
  });

  it("multiple", () => {
    expect(
      Parser.parse("case a: case b: default: boolean A; a:this;", parser =>
        parser.switchBlockStatementGroup()
      )
    ).toEqual({
      type: "SWITCH_BLOCK_STATEMENT_GROUP",
      labels: [
        {
          type: "SWITCH_LABEL_CASE",
          expression: {
            type: "IDENTIFIER",
            value: "a"
          }
        },
        {
          type: "SWITCH_LABEL_CASE",
          expression: {
            type: "IDENTIFIER",
            value: "b"
          }
        },
        {
          type: "SWITCH_LABEL_DEFAULT"
        }
      ],
      statements: [
        {
          type: "LOCAL_VARIABLE_DECLARATION",
          modifiers: [],
          typeType: {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          },
          declarators: {
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
          }
        },
        {
          type: "IDENTIFIER_STATEMENT",
          identifier: {
            type: "IDENTIFIER",
            value: "a"
          },
          statement: {
            type: "EXPRESSION_STATEMENT",
            expression: {
              type: "THIS"
            }
          }
        }
      ]
    });
  });

  it("no statements", () => {
    expect(
      Parser.parse("case a:", parser => parser.switchBlockStatementGroup())
    ).toEqual({
      type: "SWITCH_BLOCK_STATEMENT_GROUP",
      labels: [
        {
          type: "SWITCH_LABEL_CASE",
          expression: {
            type: "IDENTIFIER",
            value: "a"
          }
        }
      ],
      statements: []
    });
  });
});
