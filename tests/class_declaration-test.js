"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("classDeclaration", () => {
  it("empty", () => {
    expect(
      Parser.parse("class A{}", parser => parser.classDeclaration())
    ).to.eql({
      type: "CLASS_DECLARATION",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      typeParameters: undefined,
      extends: undefined,
      implements: undefined,
      body: {
        type: "CLASS_BODY",
        declarations: []
      }
    });
  });

  it("typeParameters", () => {
    expect(
      Parser.parse("class A<B>{}", parser => parser.classDeclaration())
    ).to.eql({
      type: "CLASS_DECLARATION",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      typeParameters: {
        type: "TYPE_PARAMETERS",
        parameters: [
          {
            type: "TYPE_PARAMETER",
            annotations: [],
            name: {
              type: "IDENTIFIER",
              value: "B"
            },
            typeBound: undefined
          }
        ]
      },
      extends: undefined,
      implements: undefined,
      body: {
        type: "CLASS_BODY",
        declarations: []
      }
    });
  });

  it("extends", () => {
    expect(
      Parser.parse("class A extends boolean{}", parser =>
        parser.classDeclaration()
      )
    ).to.eql({
      type: "CLASS_DECLARATION",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      typeParameters: undefined,
      extends: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      implements: undefined,
      body: {
        type: "CLASS_BODY",
        declarations: []
      }
    });
  });

  it("implements", () => {
    expect(
      Parser.parse("class A implements boolean{}", parser =>
        parser.classDeclaration()
      )
    ).to.eql({
      type: "CLASS_DECLARATION",
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      typeParameters: undefined,
      extends: undefined,
      implements: {
        type: "TYPE_LIST",
        list: [
          {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          }
        ]
      },
      body: {
        type: "CLASS_BODY",
        declarations: []
      }
    });
  });
});
