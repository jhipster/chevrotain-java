"use strict";
const Parser = require("../src/index");

describe("localTypeDeclaration", () => {
  it("classDeclaration", () => {
    expect(
      Parser.parse("class A{}", parser => parser.localTypeDeclaration())
    ).toEqual({
      type: "LOCAL_TYPE_DECLARATION",
      modifiers: [],
      declaration: {
        type: "CLASS_DECLARATION",
        name: "A",
        typeParameters: undefined,
        extends: undefined,
        implements: undefined,
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("empty", () => {
    expect(
      Parser.parse("interface A{}", parser => parser.localTypeDeclaration())
    ).toEqual({
      type: "LOCAL_TYPE_DECLARATION",
      modifiers: [],
      declaration: {
        type: "INTERFACE_DECLARATION",
        name: "A",
        typeParameters: undefined,
        typeList: undefined,
        body: {
          type: "INTERFACE_BODY",
          declarations: []
        }
      }
    });
  });

  it("one modifier", () => {
    expect(
      Parser.parse("public class A{}", parser => parser.localTypeDeclaration())
    ).toEqual({
      type: "LOCAL_TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "public"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: "A",
        typeParameters: undefined,
        extends: undefined,
        implements: undefined,
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("multiple modifiers", () => {
    expect(
      Parser.parse("public static class A{}", parser =>
        parser.localTypeDeclaration()
      )
    ).toEqual({
      type: "LOCAL_TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "public"
        },
        {
          type: "MODIFIER",
          value: "static"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: "A",
        typeParameters: undefined,
        extends: undefined,
        implements: undefined,
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });
});
