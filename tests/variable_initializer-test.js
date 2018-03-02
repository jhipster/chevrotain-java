"use strict";
const Parser = require("../src/index");

describe("variableInitializer", () => {
  it("expression", () => {
    expect(
      Parser.parse("this", parser => parser.variableInitializer())
    ).toEqual({
      type: "THIS"
    });
  });

  it("arrayInitializer", () => {
    expect(Parser.parse("{}", parser => parser.variableInitializer())).toEqual({
      type: "ARRAY_INITIALIZER",
      variableInitializers: []
    });
  });

  it("ifElseExpression", () => {
    expect(
      Parser.parse("this ? true : false", parser =>
        parser.variableInitializer()
      )
    ).toEqual({
      type: "IF_ELSE_EXPRESSION",
      condition: { type: "THIS" },
      if: {
        type: "BOOLEAN_LITERAL",
        value: "true"
      },
      else: {
        type: "BOOLEAN_LITERAL",
        value: "false"
      }
    });
  });
});
