"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("typeArguments", () => {
  it("single", () => {
    expect(Parser.parse("<boolean>", parser => parser.typeArguments())).to.eql({
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

  it("multi", () => {
    expect(
      Parser.parse("<boolean, char>", parser => parser.typeArguments())
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
