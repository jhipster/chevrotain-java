"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("ifStatement", () => {
  it("if", () => {
    expect(Parser.parse("if (this) {}", parser => parser.ifStatement())).to.eql(
      {
        type: "IF_STATEMENT",
        condition: {
          type: "THIS"
        },
        body: {
          type: "BLOCK",
          statements: []
        },
        else: undefined
      }
    );
  });

  it("else", () => {
    expect(
      Parser.parse("if (this) {} else {}", parser => parser.ifStatement())
    ).to.eql({
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
