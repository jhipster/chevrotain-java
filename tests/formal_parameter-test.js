"use strict";
const Parser = require("../src/index");

describe("formalParameter", () => {
  it("simple", () => {
    expect(
      Parser.parse("boolean a", parser => parser.formalParameter())
    ).toEqual({
      type: "FORMAL_PARAMETER",
      modifiers: [],
      dotDotDot: false,
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      }
    });
  });

  it("one annotation", () => {
    expect(
      Parser.parse("final boolean a", parser => parser.formalParameter())
    ).toEqual({
      type: "FORMAL_PARAMETER",
      modifiers: [{ type: "MODIFIER", value: "final" }],
      dotDotDot: false,
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      }
    });
  });

  it("two annotation", () => {
    expect(
      Parser.parse("@Bean final boolean a", parser => parser.formalParameter())
    ).toEqual({
      type: "FORMAL_PARAMETER",
      modifiers: [
        {
          type: "ANNOTATION",
          name: { type: "QUALIFIED_NAME", name: ["Bean"] },
          hasBraces: false,
          value: undefined
        },
        { type: "MODIFIER", value: "final" }
      ],
      dotDotDot: false,
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      }
    });
  });

  it("dotDotDot", () => {
    expect(
      Parser.parse("boolean... a", parser => parser.formalParameter())
    ).toEqual({
      type: "FORMAL_PARAMETER",
      modifiers: [],
      dotDotDot: true,
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      }
    });
  });
});
