"use strict";
const Parser = require("../src/index");

describe("annotationTypeInterface", () => {
  it("empty", () => {
    expect(
      Parser.parse("@interface A{}", parser =>
        parser.annotationTypeDeclaration()
      )
    ).toEqual({
      type: "ANNOTATION_TYPE_DECLARATION",
      name: "A",
      body: {
        type: "ANNOTATION_TYPE_BODY"
      }
    });
  });
});
