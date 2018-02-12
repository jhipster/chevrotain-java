"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("formalParameters", () => {
  it("empty", () => {
    expect(Parser.parse("()", parser => parser.formalParameters())).to.eql({
      type: "FORMAL_PARAMETERS",
      parameters: undefined
    });
  });

  it("formalParameterList", () => {
    expect(
      Parser.parse("(boolean a)", parser => parser.formalParameters())
    ).to.eql({
      type: "FORMAL_PARAMETERS",
      parameters: {
        type: "FORMAL_PARAMETER_LIST",
        formalParameters: [
          {
            type: "FORMAL_PARAMETER",
            modifiers: [],
            typeType: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "a"
              },
              cntSquares: 0
            },
            dotDotDot: false
          }
        ]
      }
    });
  });
});
