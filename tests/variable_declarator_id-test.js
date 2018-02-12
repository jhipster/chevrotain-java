"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("variableDeclaratorId", () => {
  it("primitiveType", () => {
    expect(Parser.parse("A", parser => parser.variableDeclaratorId())).to.eql({
      type: "VARIABLE_DECLARATOR_ID",
      id: {
        type: "IDENTIFIER",
        value: "A"
      },
      cntSquares: 0
    });
  });

  it("one square", () => {
    expect(Parser.parse("A[]", parser => parser.variableDeclaratorId())).to.eql(
      {
        type: "VARIABLE_DECLARATOR_ID",
        id: {
          type: "IDENTIFIER",
          value: "A"
        },
        cntSquares: 1
      }
    );
  });

  it("multiple square", () => {
    expect(
      Parser.parse("A[][]", parser => parser.variableDeclaratorId())
    ).to.eql({
      type: "VARIABLE_DECLARATOR_ID",
      id: {
        type: "IDENTIFIER",
        value: "A"
      },
      cntSquares: 2
    });
  });
});
