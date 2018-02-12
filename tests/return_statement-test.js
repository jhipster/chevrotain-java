"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("returnStatement", () => {
  it("with expression", () => {
    expect(
      Parser.parse("return this;", parser => parser.returnStatement())
    ).to.eql({
      type: "RETURN_STATEMENT",
      expression: {
        type: "THIS"
      }
    });
  });

  it("only return", () => {
    expect(Parser.parse("return;", parser => parser.returnStatement())).to.eql({
      type: "RETURN_STATEMENT",
      expression: undefined
    });
  });
});
