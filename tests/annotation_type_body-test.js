"use strict";
const Parser = require("../src/index");

describe("annotationTypeBody", () => {
  it("empty", () => {
    expect(Parser.parse("{}", parser => parser.annotationTypeBody())).toEqual({
      type: "ANNOTATION_TYPE_BODY",
      declarations: []
    });
  });

  it("single", () => {
    expect(
      Parser.parse("{class A{}}", parser => parser.annotationTypeBody())
    ).toEqual({
      type: "ANNOTATION_TYPE_BODY",
      declarations: [
        {
          type: "ANNOTATION_TYPE_ELEMENT_DECLARATION",
          modifiers: [],
          declaration: {
            body: {
              type: "CLASS_BODY"
            },
            name: "A",
            type: "CLASS_DECLARATION"
          }
        }
      ]
    });
  });

  it("multi", () => {
    expect(
      Parser.parse("{class A{}; class B{}}", parser =>
        parser.annotationTypeBody()
      )
    ).toEqual({
      type: "ANNOTATION_TYPE_BODY",
      declarations: [
        {
          type: "ANNOTATION_TYPE_ELEMENT_DECLARATION",
          modifiers: [],
          declaration: {
            body: {
              type: "CLASS_BODY"
            },
            name: "A",
            type: "CLASS_DECLARATION"
          }
        },
        {
          type: "ANNOTATION_TYPE_ELEMENT_DECLARATION",
          modifiers: [],
          declaration: {
            body: {
              type: "CLASS_BODY"
            },
            name: "B",
            type: "CLASS_DECLARATION"
          }
        }
      ]
    });
  });
});
