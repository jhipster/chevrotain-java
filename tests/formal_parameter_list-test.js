"use strict";
const Parser = require("../src/index");

const MismatchedTokenException = require("chevrotain").exceptions
  .MismatchedTokenException;

describe("formalParameterList", () => {
  it("one formalParameter", () => {
    expect(
      Parser.parse("boolean a", parser => parser.formalParameterList())
    ).toEqual([
      {
        type: "FORMAL_PARAMETER",
        modifiers: [],
        typeType: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        dotDotDot: false,
        id: {
          type: "VARIABLE_DECLARATOR_ID",
          id: {
            type: "IDENTIFIER",
            value: "a"
          },
          cntSquares: 0
        }
      }
    ]);
  });

  it("multiple formalParameters", () => {
    expect(
      Parser.parse("boolean a, boolean b", parser =>
        parser.formalParameterList()
      )
    ).toEqual([
      {
        type: "FORMAL_PARAMETER",
        modifiers: [],
        typeType: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        dotDotDot: false,
        id: {
          type: "VARIABLE_DECLARATOR_ID",
          id: {
            type: "IDENTIFIER",
            value: "a"
          },
          cntSquares: 0
        }
      },
      {
        type: "FORMAL_PARAMETER",
        modifiers: [],
        typeType: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        dotDotDot: false,
        id: {
          type: "VARIABLE_DECLARATOR_ID",
          id: {
            type: "IDENTIFIER",
            value: "b"
          },
          cntSquares: 0
        }
      }
    ]);
  });

  it("last is dotDotDot", () => {
    expect(
      Parser.parse("boolean a, boolean... b", parser =>
        parser.formalParameterList()
      )
    ).toEqual([
      {
        type: "FORMAL_PARAMETER",
        modifiers: [],
        typeType: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        dotDotDot: false,
        id: {
          type: "VARIABLE_DECLARATOR_ID",
          id: {
            type: "IDENTIFIER",
            value: "a"
          },
          cntSquares: 0
        }
      },
      {
        type: "FORMAL_PARAMETER",
        modifiers: [],
        typeType: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        dotDotDot: true,
        id: {
          type: "VARIABLE_DECLARATOR_ID",
          id: {
            type: "IDENTIFIER",
            value: "b"
          },
          cntSquares: 0
        }
      }
    ]);
  });

  it("not last is dotDotDot -> excpect error", () => {
    expect(() =>
      Parser.parse("boolean... a, boolean b", parser =>
        parser.formalParameterList()
      )
    ).toThrowError(MismatchedTokenException);
  });
});
