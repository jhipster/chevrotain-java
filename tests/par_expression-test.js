"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("parExpression", () => {
  it("simple", () => {
    expect(Parser.parse("(this)", parser => parser.parExpression())).to.eql({
      type: "PAR_EXPRESSION",
      expression: {
        type: "THIS"
      }
    });
  });
});
