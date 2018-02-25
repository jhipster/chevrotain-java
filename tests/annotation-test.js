"use strict";
const Parser = require("../src/index");

describe("annotation", () => {
  it("annotation", () => {
    expect(Parser.parse("@Bean", parser => parser.annotation())).toEqual({
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

  it("annotation with braces", () => {
    expect(Parser.parse("@Bean()", parser => parser.annotation())).toEqual({
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
      hasBraces: true,
      values: undefined
    });
  });

  it("annotation with element value (annotation)", () => {
    expect(
      Parser.parse("@Bean(@Something)", parser => parser.annotation())
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
      hasBraces: true,
      values: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Something"
              }
            ]
          },
          hasBraces: false,
          values: undefined
        }
      ]
    });
  });

  it("annotation with element value (elementValueArrayInitializer)", () => {
    expect(
      Parser.parse("@Bean({@Something})", parser => parser.annotation())
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
      hasBraces: true,
      values: [
        {
          type: "ELEMENT_VALUE_ARRAY_INITIALIZER",
          values: [
            {
              type: "ANNOTATION",
              name: {
                type: "QUALIFIED_NAME",
                name: [
                  {
                    type: "IDENTIFIER",
                    value: "Something"
                  }
                ]
              },
              hasBraces: false,
              values: undefined
            }
          ]
        }
      ]
    });
  });

  it("annotation with element value pairs", () => {
    expect(
      Parser.parse("@Bean(key=@Value)", parser => parser.annotation())
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
      hasBraces: true,
      values: [
        {
          type: "OPERATOR_EXPRESSION",
          left: {
            type: "IDENTIFIER",
            value: "key"
          },
          operator: "=",
          right: {
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
});
