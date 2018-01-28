"use strict";
const Parser = require("../src/index");

describe("annotationMethodRestOrConstantRest", () => {
  it("annotationMethodRest", () => {
    expect(
      Parser.parse("a()", parser => parser.annotationMethodRestOrConstantRest())
    ).toEqual({
      type: "ANNOTATION_METHOD_REST_OR_CONSTANT_REST",
      value: {
        type: "ANNOTATION_METHOD_REST",
        name: "a",
        defaultValue: undefined
      }
    });
  });
});
