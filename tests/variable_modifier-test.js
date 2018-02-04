"use strict";
const Parser = require("../src/index");

describe("variableModifier", () => {
  it("final", () => {
    expect(Parser.parse("final", parser => parser.variableModifier())).toEqual({
      type: "MODIFIER",
      value: "final"
    });
  });

  it("annotation", () => {
    expect(
      Parser.parse("@Bean", parser => parser.classOrInterfaceModifier())
    ).toEqual({
      type: "ANNOTATION",
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
