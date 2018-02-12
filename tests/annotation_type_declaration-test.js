"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("annotationTypeDeclaration", () => {
  it("empty", () => {
    expect(
      Parser.parse("@interface A{}", parser =>
        parser.annotationTypeDeclaration()
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
