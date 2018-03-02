"use strict";
const Parser = require("../src/index");

describe("nonWildcardTypeArguments", () => {
  it("simple", () => {
    expect(
      Parser.parse("<boolean>", parser => parser.nonWildcardTypeArguments())
    ).toEqual({
      type: "TYPE_ARGUMENTS",
      value: {
        type: "TYPE_LIST",
        list: [
          {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          }
        ]
      }
    });
  });
});
