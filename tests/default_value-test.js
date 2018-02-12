"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("defaultValue", () => {
  it("annotation", () => {
    expect(
      Parser.parse("default @Bean", parser => parser.defaultValue())
    ).to.eql({
      type: "DEFAULT_VALUE",
      value: {
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
        hasBraces: false,
        value: undefined
      }
    });
  });
});
