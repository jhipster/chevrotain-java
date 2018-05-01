"use strict";
const Parser = require("../src/index");

describe("package", () => {
  it("single qualifiers", () => {
    expect(
      Parser.parse("package pkg;", parser => parser.packageDeclaration())
    ).toEqual({
      type: "PACKAGE_DECLARATION",
      modifiers: [],
      name: {
        type: "QUALIFIED_NAME",
        name: [
          {
            type: "IDENTIFIER",
            value: "pkg"
          }
        ]
      }
    });
  });

  it("multiple qualifiers", () => {
    expect(
      Parser.parse("package pkg.name;", parser => parser.packageDeclaration())
    ).toEqual({
      type: "PACKAGE_DECLARATION",
      modifiers: [],
      name: {
        type: "QUALIFIED_NAME",
        name: [
          {
            type: "IDENTIFIER",
            value: "pkg"
          },
          {
            type: "IDENTIFIER",
            value: "name"
          }
        ]
      }
    });
  });

  it("single annotation", () => {
    expect(
      Parser.parse("@Annotation package pkg;", parser =>
        parser.packageDeclaration()
      )
    ).toEqual({
      type: "PACKAGE_DECLARATION",
      modifiers: [
        {
          type: "ANNOTATION",
          name: {
            name: [
              {
                type: "IDENTIFIER",
                value: "Annotation"
              }
            ],
            type: "QUALIFIED_NAME"
          },
          hasBraces: false,
          values: undefined
        }
      ],
      name: {
        type: "QUALIFIED_NAME",
        name: [
          {
            type: "IDENTIFIER",
            value: "pkg"
          }
        ]
      }
    });
  });

  it("multiple annotation", () => {
    expect(
      Parser.parse("@Annotation1 @Annotation2 package pkg;", parser =>
        parser.packageDeclaration()
      )
    ).toEqual({
      type: "PACKAGE_DECLARATION",
      modifiers: [
        {
          type: "ANNOTATION",
          name: {
            name: [
              {
                type: "IDENTIFIER",
                value: "Annotation1"
              }
            ],
            type: "QUALIFIED_NAME"
          },
          hasBraces: false,
          values: undefined
        },
        {
          type: "ANNOTATION",
          name: {
            name: [
              {
                type: "IDENTIFIER",
                value: "Annotation2"
              }
            ],
            type: "QUALIFIED_NAME"
          },
          hasBraces: false,
          values: undefined
        }
      ],
      name: {
        type: "QUALIFIED_NAME",
        name: [
          {
            type: "IDENTIFIER",
            value: "pkg"
          }
        ]
      }
    });
  });
});
