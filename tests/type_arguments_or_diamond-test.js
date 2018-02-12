"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("typeArgumentsOrDiamond", () => {
  it("typeArguments", () => {
    expect(
      Parser.parse("<boolean>", parser => parser.typeArgumentsOrDiamond())
    ).to.eql({
      type: "TYPE_ARGUMENTS",
      arguments: [
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
    });
  });

  it("emptyDiamond", () => {
    expect(
      Parser.parse("<>", parser => parser.typeArgumentsOrDiamond())
    ).to.eql({
      type: "EMPTY_DIAMOND"
    });
  });
});
