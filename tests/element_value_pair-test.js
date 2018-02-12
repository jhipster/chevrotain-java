"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("elementValuePair", () => {
  it("elementValuePair", () => {
    expect(
      Parser.parse("key=@Value", parser => parser.elementValuePair())
    ).to.eql({
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
