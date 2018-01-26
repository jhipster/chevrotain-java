"use strict";
const Parser = require("../src/index");

describe("package", () => {
  it("single qualifiers", () => {
    expect(
      Parser.parse("package pkg;", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: {
        type: "PACKAGE_DECLARATION",
        name: {
          type: "QUALIFIED_NAME",
          name: ["pkg"]
        }
      },
      imports: undefined,
      types: undefined
    });
  });

  it("multiple qualifiers", () => {
    expect(
      Parser.parse("package pkg.name;", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: {
        type: "PACKAGE_DECLARATION",
        name: {
          type: "QUALIFIED_NAME",
          name: ["pkg", "name"]
        }
      },
      imports: undefined,
      types: undefined
    });
  });
});
