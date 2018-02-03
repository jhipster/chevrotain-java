"use strict";
const Parser = require("../src/index");

describe("tryStatement", () => {
  it("one catchClause", () => {
    expect(
      Parser.parse("try {} catch (A e) {}", parser => parser.tryStatement())
    ).toEqual({
      type: "TRY_STATEMENT",
      resourceSpecification: undefined,
      body: {
        type: "BLOCK",
        statements: []
      },
      catchClauses: [
        {
          type: "CATCH_CLAUSE",
          modifiers: [],
          catchType: {
            type: "CATCH_TYPE",
            types: [
              {
                type: "QUALIFIED_NAME",
                name: ["A"]
              }
            ]
          },
          id: "e",
          block: {
            type: "BLOCK",
            statements: []
          }
        }
      ],
      finally: undefined
    });
  });

  it("multiple catchClauses", () => {
    expect(
      Parser.parse("try {} catch (A e) {} catch (B e) {}", parser =>
        parser.tryStatement()
      )
    ).toEqual({
      type: "TRY_STATEMENT",
      resourceSpecification: undefined,
      body: {
        type: "BLOCK",
        statements: []
      },
      catchClauses: [
        {
          type: "CATCH_CLAUSE",
          modifiers: [],
          catchType: {
            type: "CATCH_TYPE",
            types: [
              {
                type: "QUALIFIED_NAME",
                name: ["A"]
              }
            ]
          },
          id: "e",
          block: {
            type: "BLOCK",
            statements: []
          }
        },
        {
          type: "CATCH_CLAUSE",
          modifiers: [],
          catchType: {
            type: "CATCH_TYPE",
            types: [
              {
                type: "QUALIFIED_NAME",
                name: ["B"]
              }
            ]
          },
          id: "e",
          block: {
            type: "BLOCK",
            statements: []
          }
        }
      ],
      finally: undefined
    });
  });

  it("resourceSpecification", () => {
    expect(
      Parser.parse("try ( A.B a = this ) {} catch (A e) {}", parser =>
        parser.tryStatement()
      )
    ).toEqual({
      type: "TRY_STATEMENT",
      resourceSpecification: {
        type: "RESOURCE_SPECIFICATION",
        resources: {
          type: "RESOURCES",
          resources: [
            {
              type: "RESOURCE",
              modifiers: [],
              typeType: {
                type: "CLASS_OR_INTERFACE_TYPE",
                elements: [
                  {
                    type: "IDENTIFIER",
                    value: "A"
                  },
                  {
                    type: "IDENTIFIER",
                    value: "B"
                  }
                ]
              },
              id: {
                type: "VARIABLE_DECLARATOR_ID",
                id: "a",
                cntSquares: 0
              },
              expression: {
                type: "THIS"
              }
            }
          ]
        }
      },
      body: {
        type: "BLOCK",
        statements: []
      },
      catchClauses: [
        {
          type: "CATCH_CLAUSE",
          modifiers: [],
          catchType: {
            type: "CATCH_TYPE",
            types: [
              {
                type: "QUALIFIED_NAME",
                name: ["A"]
              }
            ]
          },
          id: "e",
          block: {
            type: "BLOCK",
            statements: []
          }
        }
      ],
      finally: undefined
    });
  });

  it("one catchClause with finallyBlock", () => {
    expect(
      Parser.parse("try {} catch (A e) {} finally {}", parser =>
        parser.tryStatement()
      )
    ).toEqual({
      type: "TRY_STATEMENT",
      resourceSpecification: undefined,
      body: {
        type: "BLOCK",
        statements: []
      },
      catchClauses: [
        {
          type: "CATCH_CLAUSE",
          modifiers: [],
          catchType: {
            type: "CATCH_TYPE",
            types: [
              {
                type: "QUALIFIED_NAME",
                name: ["A"]
              }
            ]
          },
          id: "e",
          block: {
            type: "BLOCK",
            statements: []
          }
        }
      ],
      finally: {
        type: "FINALLY_BLOCK",
        block: {
          type: "BLOCK",
          statements: []
        }
      }
    });
  });

  it("only finallyBlock", () => {
    expect(
      Parser.parse("try {} finally {}", parser => parser.tryStatement())
    ).toEqual({
      type: "TRY_STATEMENT",
      resourceSpecification: undefined,
      body: {
        type: "BLOCK",
        statements: []
      },
      catchClauses: [],
      finally: {
        type: "FINALLY_BLOCK",
        block: {
          type: "BLOCK",
          statements: []
        }
      }
    });
  });
});
