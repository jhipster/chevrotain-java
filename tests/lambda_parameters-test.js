"use strict";
const Parser = require("../src/index");

describe("lambdaParameters", () => {
  it("identifier", () => {
    expect(Parser.parse("a", parser => parser.lambdaParameters())).toEqual("a");
  });

  it("empty parameters", () => {
    expect(Parser.parse("()", parser => parser.lambdaParameters())).toEqual({
      type: "EMPTY_PARAMETERS"
    });
  });

  it("formalParameters", () => {
    expect(
      Parser.parse("(boolean a)", parser => parser.lambdaParameters())
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

  it("identfiers", () => {
    expect(Parser.parse("(a)", parser => parser.lambdaParameters())).toEqual({
      type: "IDENTIFIERS",
      identifiers: {
        type: "IDENTIFIER_LIST",
        identifiers: ["a"]
      }
    });
  });
});
