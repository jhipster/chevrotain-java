"use strict";
const Parser = require("../src/index");

describe("explicitGenericInvocationSuffix", () => {
  it("super", () => {
    expect(
      Parser.parse("super ()", parser =>
        parser.explicitGenericInvocationSuffix()
      )
    ).toEqual({
      type: "SUPER",
      value: {
        type: "ARGUMENTS"
      }
    });
  });

  it("identifierArguments", () => {
    expect(
      Parser.parse("a()", parser => parser.explicitGenericInvocationSuffix())
    ).toEqual({
      type: "IDENTIFIER_ARGUMENTS",
      name: "a",
      arguments: {
        type: "ARGUMENTS"
      }
    });
  });
});
