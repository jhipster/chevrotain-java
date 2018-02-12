"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("nonWildcardTypeArgumentsOrDiamond", () => {
  it("nonWildcardTypeArguments", () => {
    expect(
      Parser.parse("<boolean>", parser =>
        parser.nonWildcardTypeArgumentsOrDiamond()
      )
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

  it("emptyDiamond", () => {
    expect(
      Parser.parse("<>", parser => parser.nonWildcardTypeArgumentsOrDiamond())
    ).to.eql({
      type: "EMPTY_DIAMOND"
    });
  });
});
