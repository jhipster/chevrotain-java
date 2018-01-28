"use strict";
const Parser = require("../src/index");

describe("defaultValue", () => {
  it("annotation", () => {
    expect(
      Parser.parse("default @Bean", parser => parser.defaultValue())
    ).toEqual({
      type: "DEFAULT_VALUE",
      value: {
        type: "ANNOTATION",
        name: {
          type: "QUALIFIED_NAME",
          name: ["Bean"]
        },
        hasBraces: false
      }
    });
  });
});
