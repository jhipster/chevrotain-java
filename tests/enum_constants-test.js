"use strict";
const Parser = require("../src/index");

describe("enumConstants", () => {
  it("single", () => {
    expect(Parser.parse("A", parser => parser.enumConstants())).toEqual({
      type: "ENUM_CONSTANTS",
      list: [
        {
          type: "ENUM_CONSTANT",
          modifiers: [],
          name: {
            type: "IDENTIFIER",
            value: "A"
          },
          arguments: undefined,
          body: undefined
        }
      ]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("A, B", parser => parser.enumConstants())).toEqual({
      type: "ENUM_CONSTANTS",
      list: [
        {
          type: "ENUM_CONSTANT",
          modifiers: [],
          name: {
            type: "IDENTIFIER",
            value: "A"
          },
          arguments: undefined,
          body: undefined
        },
        {
          type: "ENUM_CONSTANT",
          modifiers: [],
          name: {
            type: "IDENTIFIER",
            value: "B"
          },
          arguments: undefined,
          body: undefined
        }
      ]
    });
  });
});
