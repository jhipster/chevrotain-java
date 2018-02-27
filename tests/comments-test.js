"use strict";
const Parser = require("../src/index");

describe("comment", () => {
  it("end of line comment", () => {
    expect(
      Parser.parse("// comment", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: []
    });
  });

  it("javadoc comment", () => {
    expect(
      Parser.parse("/**\n *\n */", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: []
    });
  });

  it("traditional comment", () => {
    expect(
      Parser.parse("/* comment \n\r */", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: []
    });
  });
});
