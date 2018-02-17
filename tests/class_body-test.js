"use strict";
const Parser = require("../src/index");

describe("classBody", () => {
  it("empty", () => {
    expect(Parser.parse("{}", parser => parser.classBody())).toEqual({
      type: "CLASS_BODY",
      declarations: []
    });
  });

  it("one declaration", () => {
    expect(
      Parser.parse("{ void a() {} }", parser => parser.classBody())
    ).toEqual({
      type: "CLASS_BODY",
      declarations: [
        {
          type: "CLASS_BODY_MEMBER_DECLARATION",
          modifiers: [],
          declaration: {
            type: "METHOD_DECLARATION",
            typeType: {
              type: "VOID"
            },
            name: {
              type: "IDENTIFIER",
              value: "a"
            },
            parameters: {
              type: "FORMAL_PARAMETERS",
              parameters: []
            },
            cntSquares: 0,
            throws: undefined,
            body: {
              type: "BLOCK",
              statements: []
            }
          }
        }
      ]
    });
  });

  it("multiple declarations", () => {
    expect(
      Parser.parse("{ void a() {} {} }", parser => parser.classBody())
    ).toEqual({
      type: "CLASS_BODY",
      declarations: [
        {
          type: "CLASS_BODY_MEMBER_DECLARATION",
          modifiers: [],
          declaration: {
            type: "METHOD_DECLARATION",
            typeType: {
              type: "VOID"
            },
            name: {
              type: "IDENTIFIER",
              value: "a"
            },
            parameters: {
              type: "FORMAL_PARAMETERS",
              parameters: []
            },
            cntSquares: 0,
            throws: undefined,
            body: {
              type: "BLOCK",
              statements: []
            }
          }
        },
        {
          type: "CLASS_BODY_BLOCK",
          static: false,
          block: {
            type: "BLOCK",
            statements: []
          }
        }
      ]
    });
  });
});
