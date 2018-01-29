"use strict";
const Parser = require("../src/index");

describe("interfaceMemberDeclaration", () => {
  it("interfaceMethodDeclaration", () => {
    expect(
      Parser.parse("void a() {}", parser => parser.interfaceMemberDeclaration())
    ).toEqual({
      type: "INTERFACE_METHOD_DECLARATION",
      modifiers: [],
      typeParameters: undefined,
      typeType: {
        type: "VOID"
      },
      name: "a",
      parameters: {
        type: "FORMAL_PARAMETERS",
        parameters: undefined
      },
      cntSquares: 0,
      throws: undefined,
      body: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("interfaceDeclaration", () => {
    expect(
      Parser.parse("interface A{}", parser =>
        parser.interfaceMemberDeclaration()
      )
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

  it("classDeclaration", () => {
    expect(
      Parser.parse("class A{}", parser => parser.interfaceMemberDeclaration())
    ).toEqual({
      type: "CLASS_DECLARATION",
      name: "A",
      body: {
        type: "CLASS_BODY",
        declarations: []
      }
    });
  });

  it("enumDeclaration", () => {
    expect(
      Parser.parse("enum A{}", parser => parser.interfaceMemberDeclaration())
    ).toEqual({
      type: "ENUM_DECLARATION",
      name: "A",
      implements: undefined,
      enumConstants: undefined,
      body: undefined
    });
  });
});
