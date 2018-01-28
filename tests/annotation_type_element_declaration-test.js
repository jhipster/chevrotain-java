"use strict";
const Parser = require("../src/index");

describe("annotationTypeElementDeclaration", () => {
  it("without modifiers", () => {
    expect(
      Parser.parse("class A{}", parser =>
        parser.annotationTypeElementDeclaration()
      )
    ).toEqual({
      type: "ANNOTATION_TYPE_ELEMENT_DECLARATION",
      modifiers: [],
      declaration: {
        type: "CLASS_DECLARATION",
        name: "A",
        body: {
          type: "CLASS_BODY"
        }
      }
    });
  });

  it("modifiers", () => {
    expect(
      Parser.parse("native transient class A{}", parser =>
        parser.annotationTypeElementDeclaration()
      )
    ).toEqual({
      type: "ANNOTATION_TYPE_ELEMENT_DECLARATION",
      modifiers: [
        { type: "MODIFIER", value: "native" },
        { type: "MODIFIER", value: "transient" }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: "A",
        body: {
          type: "CLASS_BODY"
        }
      }
    });
  });
});
