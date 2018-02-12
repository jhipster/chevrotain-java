"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("annotation", () => {
  it("annotation", () => {
    expect(Parser.parse("@Bean", parser => parser.annotation())).to.eql({
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
      value: undefined,
      hasBraces: false
    });
  });

  it("annotation with braces", () => {
    expect(Parser.parse("@Bean()", parser => parser.annotation())).to.eql({
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
      value: undefined
    });
  });

  it("annotation with element value (annotation)", () => {
    expect(
      Parser.parse("@Bean(@Something)", parser => parser.annotation())
    ).to.eql({
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
      value: {
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
        value: undefined
      }
    });
  });

  it("annotation with element value (elementValueArrayInitializer)", () => {
    expect(
      Parser.parse("@Bean({@Something})", parser => parser.annotation())
    ).to.eql({
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
      value: {
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
            value: undefined
          }
        ]
      }
    });
  });

  it("annotation with element value pairs", () => {
    expect(
      Parser.parse("@Bean(key=@Value)", parser => parser.annotation())
    ).to.eql({
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
      value: {
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
          value: undefined
        }
      }
    });
  });
});
