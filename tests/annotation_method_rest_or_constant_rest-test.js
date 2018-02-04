"use strict";
const Parser = require("../src/index");

describe("annotationMethodRestOrConstantRest", () => {
  it("annotationMethodRest", () => {
    expect(
      Parser.parse("a()", parser => parser.annotationMethodRestOrConstantRest())
    ).toEqual({
      type: "ANNOTATION_METHOD_REST",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      defaultValue: undefined
    });
  });

  it("annotationConstantRest", () => {
    expect(
      Parser.parse("A", parser => parser.annotationMethodRestOrConstantRest())
    ).toEqual({
      type: "VARIABLE_DECLARATORS",
      list: [
        {
          type: "VARIABLE_DECLARATOR",
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: {
              type: "IDENTIFIER",
              value: "A"
            },
            cntSquares: 0
          },
          init: undefined
        }
      ]
    });
  });
});
