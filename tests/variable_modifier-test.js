"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("variableModifier", () => {
  it("final", () => {
    expect(Parser.parse("final", parser => parser.variableModifier())).to.eql({
      type: "MODIFIER",
      value: "final"
    });
  });

  it("annotation", () => {
    expect(
      Parser.parse("@Bean", parser => parser.classOrInterfaceModifier())
    ).to.eql({
      type: "ANNOTATION",
      value: undefined,
      name: {
        type: "QUALIFIED_NAME",
        name: [
          {
            type: "IDENTIFIER",
            value: "Bean"
          }
        ]
      },
      hasBraces: false
    });
  });
});
