"use strict";
const Parser = require("../src/index");

describe("switchStatement", () => {
  it("empty", () => {
    expect(
      Parser.parse("switch (this) {}", parser => parser.switchStatement())
    ).toEqual({
      type: "SWITCH_STATEMENT",
      condition: {
        type: "THIS"
      },
      statementGroups: []
    });
  });

  it("one statementgroup", () => {
    expect(
      Parser.parse("switch (this) { case a: boolean A; }", parser =>
        parser.switchStatement()
      )
    ).toEqual({
      type: "SWITCH_STATEMENT",
      condition: {
        type: "THIS"
      },
      statementGroups: [
        {
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
        }
      ]
    });
  });

  it("multiple statementgroup", () => {
    expect(
      Parser.parse(
        "switch (this) { case a: boolean A; case b: boolean B; }",
        parser => parser.switchStatement()
      )
    ).toEqual({
      type: "SWITCH_STATEMENT",
      condition: {
        type: "THIS"
      },
      statementGroups: [
        {
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
        },
        {
          type: "SWITCH_BLOCK_STATEMENT_GROUP",
          labels: [
            {
              type: "SWITCH_LABEL_CASE",
              expression: {
                type: "IDENTIFIER",
                value: "b"
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
                        value: "B"
                      },
                      cntSquares: 0
                    },
                    init: undefined
                  }
                ]
              }
            }
          ]
        }
      ]
    });
  });

  it("last statementgroup no statements", () => {
    expect(
      Parser.parse("switch (this) { case a: boolean A; case b: }", parser =>
        parser.switchStatement()
      )
    ).toEqual({
      type: "SWITCH_STATEMENT",
      condition: {
        type: "THIS"
      },
      statementGroups: [
        {
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
        },
        {
          type: "SWITCH_BLOCK_STATEMENT_GROUP",
          labels: [
            {
              type: "SWITCH_LABEL_CASE",
              expression: {
                type: "IDENTIFIER",
                value: "b"
              }
            }
          ],
          statements: []
        }
      ]
    });
  });
});
