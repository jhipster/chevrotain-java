"use strict";
const Parser = require("../src/index");

describe("compilationUnit", () => {
  it("empty", () => {
    expect(Parser.parse("", parser => parser.compilationUnit())).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: undefined,
      types: undefined
    });
  });

  it("package", () => {
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
