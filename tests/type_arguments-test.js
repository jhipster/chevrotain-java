"use strict";
const Parser = require("../src/index");

describe("typeArguments", () => {
  it("single", () => {
    expect(Parser.parse("<boolean>", parser => parser.typeArguments())).toEqual(
      {
        type: "TYPE_ARGUMENTS",
        arguments: [
          {
            type: "TYPE_ARGUMENT",
            argument: {
              type: "TYPE_TYPE",
              annotations: [],
              value: {
                type: "PRIMITIVE_TYPE",
                value: "boolean"
              },
              cntSquares: 0
            },
            super: undefined,
            extends: undefined
          }
        ]
      }
    );
  });

  it("multi", () => {
    expect(
      Parser.parse("<boolean, char>", parser => parser.typeArguments())
    ).toEqual({
      type: "TYPE_ARGUMENTS",
      arguments: [
        {
          type: "TYPE_ARGUMENT",
          argument: {
            type: "TYPE_TYPE",
            annotations: [],
            value: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            cntSquares: 0
          },
          super: undefined,
          extends: undefined
        },
        {
          type: "TYPE_ARGUMENT",
          argument: {
            type: "TYPE_TYPE",
            annotations: [],
            value: {
              type: "PRIMITIVE_TYPE",
              value: "char"
            },
            cntSquares: 0
          },
          super: undefined,
          extends: undefined
        }
      ]
    });
  });
});
