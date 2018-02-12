"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("nonWildcardTypeArguments", () => {
  it("simple", () => {
    expect(
      Parser.parse("<boolean>", parser => parser.nonWildcardTypeArguments())
    ).to.eql({
      type: "NON_WILDCARD_TYPE_ARGUMENTS",
      typeList: {
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
