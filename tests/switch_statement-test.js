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
              type: "EXPRESSION_STATEMENT",
              expression: {
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
                        dimensions: []
                      },
                      init: undefined
                    }
                  ]
                }
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
              type: "EXPRESSION_STATEMENT",
              expression: {
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
                        dimensions: []
                      },
                      init: undefined
                    }
                  ]
                }
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
              type: "EXPRESSION_STATEMENT",
              expression: {
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
                        dimensions: []
                      },
                      init: undefined
                    }
                  ]
                }
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
              type: "EXPRESSION_STATEMENT",
              expression: {
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
                        dimensions: []
                      },
                      init: undefined
                    }
                  ]
                }
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
