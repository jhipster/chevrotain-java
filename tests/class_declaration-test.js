"use strict";
const Parser = require("../src/index");

describe("classDeclaration", () => {
  it("empty", () => {
    expect(
      Parser.parse("class A{}", parser => parser.classDeclaration())
    ).toEqual({
      type: "CLASS_DECLARATION",
      name: "A",
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
    ).toEqual({
      type: "CLASS_DECLARATION",
      name: "A",
      typeParameters: {
        type: "TYPE_PARAMETERS",
        parameters: [
          {
            type: "TYPE_PARAMETER",
            annotations: [],
            name: "B",
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
    ).toEqual({
      type: "CLASS_DECLARATION",
      name: "A",
      typeParameters: undefined,
      extends: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 0
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
    ).toEqual({
      type: "CLASS_DECLARATION",
      name: "A",
      typeParameters: undefined,
      extends: undefined,
      implements: {
        type: "TYPE_LIST",
        list: [
          {
            type: "TYPE_TYPE",
            annotations: [],
            value: {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            },
            cntSquares: 0
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
