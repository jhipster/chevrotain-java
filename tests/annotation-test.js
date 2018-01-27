"use strict";
const Parser = require("../src/index");

describe("annotation", () => {
  it("annotation", () => {
    expect(Parser.parse("@Bean", parser => parser.annotation())).toEqual({
      type: "ANNOTATION",
      name: {
        type: "QUALIFIED_NAME",
        name: ["Bean"]
      },
      hasBraces: false
    });
  });

  it("annotation with braces", () => {
    expect(Parser.parse("@Bean()", parser => parser.annotation())).toEqual({
      type: "ANNOTATION",
      name: {
        type: "QUALIFIED_NAME",
        name: ["Bean"]
      },
      hasBraces: true,
      value: undefined
    });
  });

  it("annotation with element value (annotation)", () => {
    expect(
      Parser.parse("@Bean(@Something)", parser => parser.annotation())
    ).toEqual({
      type: "ANNOTATION",
      name: {
        type: "QUALIFIED_NAME",
        name: ["Bean"]
      },
      hasBraces: true,
      value: {
        type: "ANNOTATION",
        name: {
          type: "QUALIFIED_NAME",
          name: ["Something"]
        },
        hasBraces: false,
        value: undefined
      }
    });
  });

  it("annotation with element value (elementValueArrayInitializer)", () => {
    expect(
      Parser.parse("@Bean({@Something})", parser => parser.annotation())
    ).toEqual({
      type: "ANNOTATION",
      name: {
        type: "QUALIFIED_NAME",
        name: ["Bean"]
      },
      hasBraces: true,
      value: {
        type: "ELEMENT_VALUE_ARRAY_INITIALIZER",
        values: [
          {
            type: "ANNOTATION",
            name: {
              type: "QUALIFIED_NAME",
              name: ["Something"]
            },
            hasBraces: false,
            value: undefined
          }
        ]
      }
    });
  });

  it("annotation with element value pairs", () => {
    expect(
      Parser.parse("@Bean(key=@Value)", parser => parser.annotation())
    ).toEqual({
      type: "ANNOTATION",
      name: {
        type: "QUALIFIED_NAME",
        name: ["Bean"]
      },
      hasBraces: true,
      value: {
        type: "ELEMENT_VALUE_PAIRS",
        pairs: [
          {
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
          }
        ]
      }
    });
  });
});
