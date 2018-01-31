"use strict";
const Parser = require("../src/index");

describe("nonWildcardTypeArguments", () => {
  it("simple", () => {
    expect(
      Parser.parse("<boolean>", parser => parser.nonWildcardTypeArguments())
    ).toEqual({
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
    });
  });
});
