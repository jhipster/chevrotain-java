"use strict";
const Parser = require("../src/index");

describe("statementWithStartingToken", () => {
  it("block", () => {
    expect(
      Parser.parse("{}", parser => parser.statementWithStartingToken())
    ).toEqual({
      type: "BLOCK",
      statements: []
    });
  });

  it("assertStatement", () => {
    expect(
      Parser.parse("assert this;", parser =>
        parser.statementWithStartingToken()
      )
    ).toEqual({
      type: "ASSERT_STATEMENT",
      expressions: [
        {
          type: "THIS"
        }
      ]
    });
  });

  it("ifStatement", () => {
    expect(
      Parser.parse("if (this) {}", parser =>
        parser.statementWithStartingToken()
      )
    ).toEqual({
      type: "IF_STATEMENT",
      condition: {
        type: "THIS"
      },
      body: {
        type: "BLOCK",
        statements: []
      },
      else: undefined
    });
  });

  it("forStatement", () => {
    expect(
      Parser.parse("for (;;) {}", parser => parser.statementWithStartingToken())
    ).toEqual({
      type: "FOR_STATEMENT",
      forControl: {
        type: "BASIC_FOR_CONTROL",
        forInit: undefined,
        expression: undefined,
        expressionList: undefined
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("whileStatement", () => {
    expect(
      Parser.parse("while (this) {}", parser =>
        parser.statementWithStartingToken()
      )
    ).toEqual({
      type: "WHILE_STATEMENT",
      condition: {
        type: "THIS"
      },
      body: {
        type: "BLOCK",
        statements: []
      },
      else: undefined
    });
  });

  it("doWhileStatement", () => {
    expect(
      Parser.parse("do {} while (this);", parser =>
        parser.statementWithStartingToken()
      )
    ).toEqual({
      type: "DO_WHILE_STATEMENT",
      body: {
        type: "BLOCK",
        statements: []
      },
      condition: {
        type: "THIS"
      }
    });
  });

  it("tryStatement", () => {
    expect(
      Parser.parse("try {} catch (A e) {}", parser =>
        parser.statementWithStartingToken()
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
            list: [
              {
                type: "QUALIFIED_NAME",
                name: [
                  {
                    type: "IDENTIFIER",
                    value: "A"
                  }
                ]
              }
            ]
          },
          id: {
            type: "IDENTIFIER",
            value: "e"
          },
          block: {
            type: "BLOCK",
            statements: []
          }
        }
      ],
      finally: undefined
    });
  });

  it("switchStatement", () => {
    expect(
      Parser.parse("switch (this) {}", parser =>
        parser.statementWithStartingToken()
      )
    ).toEqual({
      type: "SWITCH_STATEMENT",
      condition: {
        type: "THIS"
      },
      statementGroups: []
    });
  });

  it("synchronizedStatement", () => {
    expect(
      Parser.parse("synchronized (this) {}", parser =>
        parser.statementWithStartingToken()
      )
    ).toEqual({
      type: "SYNCHRONIZED_STATEMENT",
      condition: {
        type: "THIS"
      },
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("returnStatement", () => {
    expect(
      Parser.parse("return this;", parser =>
        parser.statementWithStartingToken()
      )
    ).toEqual({
      type: "RETURN_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });

  it("throwStatement", () => {
    expect(
      Parser.parse("throw this;", parser => parser.statementWithStartingToken())
    ).toEqual({
      type: "THROW_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });

  it("breakStatement", () => {
    expect(
      Parser.parse("break a;", parser => parser.statementWithStartingToken())
    ).toEqual({
      type: "BREAK_STATEMENT",
      identifier: {
        type: "IDENTIFIER",
        value: "a"
      }
    });
  });

  it("continueStatement", () => {
    expect(
      Parser.parse("continue a;", parser => parser.statementWithStartingToken())
    ).toEqual({
      type: "CONTINUE_STATEMENT",
      identifier: {
        type: "IDENTIFIER",
        value: "a"
      }
    });
  });

  it("semiColonStatement", () => {
    expect(
      Parser.parse(";", parser => parser.statementWithStartingToken())
    ).toEqual({
      type: "SEMI_COLON_STATEMENT"
    });
  });
});
