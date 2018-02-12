"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("annotationMethodRestOrConstantRest", () => {
  it("annotationMethodRest", () => {
    expect(
      Parser.parse("a()", parser => parser.annotationMethodRestOrConstantRest())
    ).to.eql({
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
    ).to.eql({
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
