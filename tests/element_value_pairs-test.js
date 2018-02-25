"use strict";
const Parser = require("../src/index");

describe("elementValuePairs", () => {
  it("single", () => {
    expect(
      Parser.parse("key=@Value", parser => parser.elementValuePairs())
    ).toEqual({
      type: "ELEMENT_VALUE_PAIRS",
      pairs: [
        {
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
            values: undefined
          }
        }
      ]
    });
  });

  it("multiple", () => {
    expect(
      Parser.parse("key1=@Value1,key2=@Value2", parser =>
        parser.elementValuePairs()
      )
    ).toEqual({
      type: "ELEMENT_VALUE_PAIRS",
      pairs: [
        {
          type: "ELEMENT_VALUE_PAIR",
          key: {
            type: "IDENTIFIER",
            value: "key1"
          },
          value: {
            type: "ANNOTATION",
            name: {
              type: "QUALIFIED_NAME",
              name: [
                {
                  type: "IDENTIFIER",
                  value: "Value1"
                }
              ]
            },
            hasBraces: false,
            values: undefined
          }
        },
        {
          type: "ELEMENT_VALUE_PAIR",
          key: {
            type: "IDENTIFIER",
            value: "key2"
          },
          value: {
            type: "ANNOTATION",
            name: {
              type: "QUALIFIED_NAME",
              name: [
                {
                  type: "IDENTIFIER",
                  value: "Value2"
                }
              ]
            },
            hasBraces: false,
            values: undefined
          }
        }
      ]
    });
  });
});
