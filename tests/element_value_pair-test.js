"use strict";
const Parser = require("../src/index");

describe("elementValuePair", () => {
  it("elementValuePair", () => {
    expect(
      Parser.parse("key=@Value", parser => parser.elementValuePair())
    ).toEqual({
      type: "ELEMENT_VALUE_PAIR",
      key: {
        type: "IDENTIFIER",
        value: "key"
      },
      value: {
        type: "ANNOTATION",
        name: {
          type: "QUALIFIED_NAME",
          name: [
            {
              type: "IDENTIFIER",
              value: "Value"
            }
          ]
        },
        hasBraces: false,
        value: undefined
      }
    });
  });
});
