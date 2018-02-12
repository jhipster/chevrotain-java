"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("annotationTypeElementRest", () => {
  it("annotationTypeElementRest", () => {
    expect(
      Parser.parse("boolean a();", parser => parser.annotationTypeElementRest())
    ).to.eql({
      type: "ANNOTATION_TYPE_ELEMENT_REST",
      typeType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      name: {
        type: "ANNOTATION_METHOD_REST",
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        defaultValue: undefined
      }
    });
  });
  it("class", () => {
    expect(
      Parser.parse("class A{}", parser => parser.annotationTypeElementRest())
    ).to.eql({
      type: "CLASS_DECLARATION",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      body: {
        type: "CLASS_BODY",
        declarations: []
      },
      typeParameters: undefined,
      extends: undefined,
      implements: undefined
    });
  });

  it("enum", () => {
    expect(
      Parser.parse("enum A{}", parser => parser.annotationTypeElementRest())
    ).to.eql({
      type: "ENUM_DECLARATION",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      body: undefined,
      enumConstants: undefined,
      implements: undefined
    });
  });

  it("interface", () => {
    expect(
      Parser.parse("interface A{}", parser =>
        parser.annotationTypeElementRest()
      )
    ).to.eql({
      type: "INTERFACE_DECLARATION",
      typeList: undefined,
      typeParameters: undefined,
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      body: {
        type: "INTERFACE_BODY",
        declarations: []
      }
    });
  });

  it("annotationType", () => {
    expect(
      Parser.parse("@interface A{}", parser =>
        parser.annotationTypeElementRest()
      )
    ).to.eql({
      type: "ANNOTATION_TYPE_DECLARATION",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      body: {
        type: "ANNOTATION_TYPE_BODY",
        declarations: []
      }
    });
  });
});
