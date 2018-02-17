"use strict";
const Parser = require("../src/index");

describe("interfaceBody", () => {
  it("empty", () => {
    expect(Parser.parse("{}", parser => parser.interfaceBody())).toEqual({
      type: "INTERFACE_BODY",
      declarations: []
    });
  });

  it("one declaration", () => {
    expect(
      Parser.parse("{ void a() {} }", parser => parser.interfaceBody())
    ).toEqual({
      type: "INTERFACE_BODY",
      declarations: [
        {
          type: "INTERFACE_BODY_DECLARATION",
          modifiers: [],
          declaration: {
            type: "INTERFACE_METHOD_DECLARATION",
            modifiers: [],
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
      Parser.parse("{ void a() {} void b() {} }", parser =>
        parser.interfaceBody()
      )
    ).toEqual({
      type: "INTERFACE_BODY",
      declarations: [
        {
          type: "INTERFACE_BODY_DECLARATION",
          modifiers: [],
          declaration: {
            type: "INTERFACE_METHOD_DECLARATION",
            modifiers: [],
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
          type: "INTERFACE_BODY_DECLARATION",
          modifiers: [],
          declaration: {
            type: "INTERFACE_METHOD_DECLARATION",
            modifiers: [],
            typeType: {
              type: "VOID"
            },
            name: {
              type: "IDENTIFIER",
              value: "b"
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
});
