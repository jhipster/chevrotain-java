"use strict";
const Parser = require("../src/index");

describe("package", () => {
  it("single qualifiers", () => {
    expect(
      Parser.parse("package pkg;", parser => parser.packageDeclaration())
    ).toEqual({
      type: "PACKAGE_DECLARATION",
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
});
