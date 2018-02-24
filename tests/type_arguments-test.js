"use strict";
const Parser = require("../src/index");

describe("typeArguments", () => {
  it("single", () => {
    expect(Parser.parse("<boolean>", parser => parser.typeArguments())).toEqual(
      {
        type: "TYPE_ARGUMENTS",
        list: [
          {
            type: "TYPE_ARGUMENT",
            argument: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
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
      list: [
        {
          type: "TYPE_ARGUMENT",
          argument: {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          },
          super: undefined,
          extends: undefined
        },
        {
          type: "TYPE_ARGUMENT",
          argument: {
            type: "PRIMITIVE_TYPE",
            value: "char"
          },
          super: undefined,
          extends: undefined
        }
      ]
    });
  });
});
