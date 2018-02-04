"use strict";
const Parser = require("../src/index");

describe("annotationMethodRest", () => {
  it("identifier", () => {
    expect(
      Parser.parse("a()", parser => parser.annotationMethodRest())
    ).toEqual({
      type: "ANNOTATION_METHOD_REST",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      defaultValue: undefined
    });
  });

  it("defaultValue", () => {
    expect(
      Parser.parse("a() default @Bean", parser => parser.annotationMethodRest())
    ).toEqual({
      type: "ANNOTATION_METHOD_REST",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      defaultValue: {
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
          hasBraces: false
        }
      }
    });
  });
});
