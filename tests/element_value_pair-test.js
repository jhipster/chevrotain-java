"use strict";
const Parser = require("../src/index");

describe("elementValuePair", () => {
  it("elementValuePair", () => {
    expect(
      Parser.parse("key=@Value", parser => parser.elementValuePair())
    ).toEqual({
      type: "ELEMENT_VALUE_PAIR",
      key: "key",
      value: {
        type: "ANNOTATION",
        name: {
          type: "QUALIFIED_NAME",
          name: ["Value"]
        },
        hasBraces: false,
        value: undefined
      }
    });
  });
});
