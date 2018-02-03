"use strict";
const Parser = require("../src/index");

describe("interfaceDeclaration", () => {
  it("empty", () => {
    expect(
      Parser.parse("interface A{}", parser => parser.interfaceDeclaration())
    ).toEqual({
      type: "INTERFACE_DECLARATION",
      name: "A",
      typeParameters: undefined,
      typeList: undefined,
      body: {
        type: "INTERFACE_BODY",
        declarations: []
      }
    });
  });

  it("typeParameters", () => {
    expect(
      Parser.parse("interface A<B>{}", parser => parser.interfaceDeclaration())
    ).toEqual({
      type: "INTERFACE_DECLARATION",
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
      typeList: undefined,
      body: {
        type: "INTERFACE_BODY",
        declarations: []
      }
    });
  });

  it("typeList", () => {
    expect(
      Parser.parse("interface A extends boolean {}", parser =>
        parser.interfaceDeclaration()
      )
    ).toEqual({
      type: "INTERFACE_DECLARATION",
      name: "A",
      typeParameters: undefined,
      typeList: {
        type: "TYPE_LIST",
        list: [
          {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          }
        ]
      },
      body: {
        type: "INTERFACE_BODY",
        declarations: []
      }
    });
  });
});
