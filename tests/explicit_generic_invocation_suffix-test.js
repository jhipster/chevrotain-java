"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("explicitGenericInvocationSuffix", () => {
  it("super", () => {
    expect(
      Parser.parse("super ()", parser =>
        parser.explicitGenericInvocationSuffix()
      )
    ).to.eql({
      type: "SUPER",
      value: {
        type: "ARGUMENTS"
      }
    });
  });

  it("identifierArguments", () => {
    expect(
      Parser.parse("a()", parser => parser.explicitGenericInvocationSuffix())
    ).to.eql({
      type: "IDENTIFIER_ARGUMENTS",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      arguments: {
        type: "ARGUMENTS"
      }
    });
  });
});
