"use strict";
const Parser = require("../src/index");

describe("primary", () => {
  it("this", () => {
    expect(Parser.parse("this", parser => parser.primary())).toEqual({
      type: "THIS"
    });
  });

  it("super", () => {
    expect(Parser.parse("super", parser => parser.primary())).toEqual({
      type: "SUPER"
    });
  });

  it("floatLiteral", () => {
    expect(Parser.parse("0.1", parser => parser.primary())).toEqual({
      type: "FLOAT_LITERAL",
      value: "0.1"
    });
  });

  it("void", () => {
    expect(Parser.parse("void", parser => parser.primary())).toEqual({
      type: "VOID"
    });
  });

  it("identifier", () => {
    expect(Parser.parse("A", parser => parser.primary())).toEqual({
      type: "TYPE_TYPE",
      annotations: [],
      value: {
        elements: [
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "A",
            typeArguments: undefined
          }
        ],
        type: "CLASS_OR_INTERFACE_TYPE"
      },
      cntSquares: 0
    });
  });

  it("identifier.identifier", () => {
    expect(Parser.parse("A.B", parser => parser.primary())).toEqual({
      type: "TYPE_TYPE",
      annotations: [],
      value: {
        elements: [
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "A",
            typeArguments: undefined
          },
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "B",
            typeArguments: undefined
          }
        ],
        type: "CLASS_OR_INTERFACE_TYPE"
      },
      cntSquares: 0
    });
  });

  it("identifier.class", () => {
    expect(Parser.parse("A.class", parser => parser.primary())).toEqual({
      type: "TYPE_TYPE",
      annotations: [],
      value: {
        elements: [
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "A",
            typeArguments: undefined
          },
          { type: "CLASS" }
        ],
        type: "CLASS_OR_INTERFACE_TYPE"
      },
      cntSquares: 0
    });
  });

  it("identifier with typeArguments", () => {
    expect(Parser.parse("A<B>", parser => parser.primary())).toEqual({
      type: "TYPE_TYPE",
      annotations: [],
      value: {
        type: "CLASS_OR_INTERFACE_TYPE",
        elements: [
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "A",
            typeArguments: {
              type: "TYPE_ARGUMENTS",
              arguments: [
                {
                  type: "TYPE_ARGUMENT",
                  argument: {
                    type: "TYPE_TYPE",
                    annotations: [],
                    value: {
                      elements: [
                        {
                          type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
                          name: "B",
                          typeArguments: undefined
                        }
                      ],
                      type: "CLASS_OR_INTERFACE_TYPE"
                    },
                    cntSquares: 0
                  },
                  extends: undefined,
                  super: undefined
                }
              ]
            }
          }
        ]
      },
      cntSquares: 0
    });
  });

  it("genericInvocation", () => {
    expect(
      Parser.parse("<boolean> this()", parser => parser.primary())
    ).toEqual({
      type: "GENERIC_INVOCATION",
      typeArguments: {
        type: "NON_WILDCARD_TYPE_ARGUMENTS",
        typeList: {
          type: "TYPE_LIST",
          list: [
            {
              type: "TYPE_TYPE",
              annotations: [],
              value: {
                type: "PRIMITIVE_TYPE",
                value: "boolean"
              },
              cntSquares: 0
            }
          ]
        }
      },
      arguments: {
        type: "THIS_ARGUMENTS",
        arguments: {
          type: "ARGUMENTS"
        }
      }
    });
  });
});
