"use strict";
const Parser = require("../src/index");

describe("ifStatement", () => {
  it("if", () => {
    expect(
      Parser.parse("if (this) {}", parser => parser.ifStatement())
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

  it("else", () => {
    expect(
      Parser.parse("if (this) {} else {}", parser => parser.ifStatement())
    ).toEqual({
      type: "IF_STATEMENT",
      condition: {
        type: "THIS"
      },
      body: {
        type: "BLOCK",
        statements: []
      },
      else: {
        type: "BLOCK",
        statements: []
      }
    });
  });
});
