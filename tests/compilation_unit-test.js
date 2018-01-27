"use strict";
const Parser = require("../src/index");

describe("compilationUnit", () => {
  it("empty", () => {
    expect(Parser.parse("", parser => parser.compilationUnit())).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
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
      imports: [],
      types: undefined
    });
  });

  it("single import", () => {
    expect(
      Parser.parse("import pkg.name;", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [
        {
          type: "IMPORT_DECLARATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["pkg", "name"]
          }
        }
      ],
      types: undefined
    });
  });

  it("multiple import", () => {
    expect(
      Parser.parse("import pkg.name;\nimport some.other;", parser =>
        parser.compilationUnit()
      )
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [
        {
          type: "IMPORT_DECLARATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["pkg", "name"]
          }
        },
        {
          type: "IMPORT_DECLARATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["some", "other"]
          }
        }
      ],
      types: undefined
    });
  });
});
