"use strict";
const Parser = require("../src/index");

describe("formalParameters", () => {
  it("empty", () => {
    expect(Parser.parse("()", parser => parser.formalParameters())).toEqual({
      type: "FORMAL_PARAMETERS",
      parameters: undefined
    });
  });

  it("formalParameterList", () => {
    expect(
      Parser.parse("(boolean a)", parser => parser.formalParameters())
    ).toEqual({
      type: "FORMAL_PARAMETERS",
      parameters: {
        type: "FORMAL_PARAMETER_LIST",
        formalParameters: [
          {
            type: "FORMAL_PARAMETER",
            modifiers: [],
            dotDotDot: false,
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: "a",
              cntSquares: 0
            }
          }
        ]
      }
    });
  });
});
