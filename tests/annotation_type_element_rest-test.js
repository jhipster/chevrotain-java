"use strict";
const Parser = require("../src/index");

describe("annotationTypeElementRest", () => {
  it("annotationTypeElementRest", () => {
    expect(
      Parser.parse("boolean a();", parser => parser.annotationTypeElementRest())
    ).toEqual({
      type: "ANNOTATION_TYPE_ELEMENT_REST",
      typeType: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 0
      },
      name: {
        type: "ANNOTATION_METHOD_REST_OR_CONSTANT_REST",
        value: {
          type: "ANNOTATION_METHOD_REST",
          name: "a",
          defaultValue: undefined
        }
      }
    });
  });
  it("class", () => {
    expect(
      Parser.parse("class A{}", parser => parser.annotationTypeElementRest())
    ).toEqual({
      type: "CLASS_DECLARATION",
      name: "A",
      body: {
        type: "CLASS_BODY"
      }
    });
  });

  it("enum", () => {
    expect(
      Parser.parse("enum A{}", parser => parser.annotationTypeElementRest())
    ).toEqual({
      type: "ENUM_DECLARATION",
      name: "A"
    });
  });

  it("interface", () => {
    expect(
      Parser.parse("interface A{}", parser =>
        parser.annotationTypeElementRest()
      )
    ).toEqual({
      type: "INTERFACE_DECLARATION",
      name: "A",
      body: {
        type: "INTERFACE_BODY"
      }
    });
  });

  it("annotationType", () => {
    expect(
      Parser.parse("@interface A{}", parser =>
        parser.annotationTypeElementRest()
      )
    ).toEqual({
      type: "ANNOTATION_TYPE_DECLARATION",
      name: "A",
      body: {
        type: "ANNOTATION_TYPE_BODY",
        declarations: []
      }
    });
  });
});
