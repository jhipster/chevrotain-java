"use strict";
const Parser = require("../src/index");

describe("import", () => {
  it("single qualifiers", () => {
    expect(
      Parser.parse("import imp;", parser => parser.importDeclaration())
    ).toEqual({
      type: "IMPORT_DECLARATION",
      static: false,
      name: {
        type: "QUALIFIED_NAME",
        name: ["imp"]
      }
    });
  });

  it("multiple qualifiers", () => {
    expect(
      Parser.parse("import imp.name;", parser => parser.importDeclaration())
    ).toEqual({
      type: "IMPORT_DECLARATION",
      static: false,
      name: {
        type: "QUALIFIED_NAME",
        name: ["imp", "name"]
      }
    });
  });

  it("star qualifier", () => {
    expect(
      Parser.parse("import java.util.*;", parser => parser.importDeclaration())
    ).toEqual({
      type: "IMPORT_DECLARATION",
      static: false,
      name: {
        type: "QUALIFIED_NAME",
        name: ["java", "util", "*"]
      }
    });
  });

  it("static", () => {
    expect(
      Parser.parse("import static imp;", parser => parser.importDeclaration())
    ).toEqual({
      type: "IMPORT_DECLARATION",
      static: true,
      name: {
        type: "QUALIFIED_NAME",
        name: ["imp"]
      }
    });
  });
});
