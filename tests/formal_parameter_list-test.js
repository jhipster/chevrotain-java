"use strict";
const Parser = require("../src/index");

const MismatchedTokenException = require("chevrotain").exceptions
  .MismatchedTokenException;

describe("formalParameterList", () => {
  it("one formalParameter", () => {
    expect(
      Parser.parse("boolean a", parser => parser.formalParameterList())
    ).toEqual({
      type: "FORMAL_PARAMETER_LIST",
      formalParameters: [
        {
          type: "FORMAL_PARAMETER",
          modifiers: [],
          typeType: {
            type: "TYPE_TYPE",
            annotations: [],
            value: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            cntSquares: 0
          },
          dotDotDot: false,
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "a",
            cntSquares: 0
          }
        }
      ]
    });
  });

  it("multiple formalParameters", () => {
    expect(
      Parser.parse("boolean a, boolean b", parser =>
        parser.formalParameterList()
      )
    ).toEqual({
      type: "FORMAL_PARAMETER_LIST",
      formalParameters: [
        {
          type: "FORMAL_PARAMETER",
          modifiers: [],
          typeType: {
            type: "TYPE_TYPE",
            annotations: [],
            value: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            cntSquares: 0
          },
          dotDotDot: false,
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "a",
            cntSquares: 0
          }
        },
        {
          type: "FORMAL_PARAMETER",
          modifiers: [],
          typeType: {
            type: "TYPE_TYPE",
            annotations: [],
            value: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            cntSquares: 0
          },
          dotDotDot: false,
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "b",
            cntSquares: 0
          }
        }
      ]
    });
  });

  it("last is dotDotDot", () => {
    expect(
      Parser.parse("boolean a, boolean... b", parser =>
        parser.formalParameterList()
      )
    ).toEqual({
      type: "FORMAL_PARAMETER_LIST",
      formalParameters: [
        {
          type: "FORMAL_PARAMETER",
          modifiers: [],
          typeType: {
            type: "TYPE_TYPE",
            annotations: [],
            value: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            cntSquares: 0
          },
          dotDotDot: false,
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "a",
            cntSquares: 0
          }
        },
        {
          type: "FORMAL_PARAMETER",
          modifiers: [],
          typeType: {
            type: "TYPE_TYPE",
            annotations: [],
            value: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            cntSquares: 0
          },
          dotDotDot: true,
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "b",
            cntSquares: 0
          }
        }
      ]
    });
  });

  it("not last is dotDotDot -> excpect error", () => {
    expect(() =>
      Parser.parse("boolean... a, boolean b", parser =>
        parser.formalParameterList()
      )
    ).toThrowError(MismatchedTokenException);
  });
});
