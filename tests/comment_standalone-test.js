"use strict";
const Parser = require("../src/index");

describe("commentStandalone", () => {
  it("line comment standalone", () => {
    expect(
      Parser.parse("// comment\n\n", parser => parser.commentStandalone())
    ).toEqual({
      type: "COMMENT_STANDALONE",
      value: "// comment"
    });
  });

  it("javadoc comment standalone", () => {
    expect(
      Parser.parse("/** comment */\n\n", parser => parser.commentStandalone())
    ).toEqual({
      type: "COMMENT_STANDALONE",
      value: "/** comment */"
    });
  });

  it("traditional comment standalone", () => {
    expect(
      Parser.parse("/* comment */\n\n", parser => parser.commentStandalone())
    ).toEqual({
      type: "COMMENT_STANDALONE",
      value: "/* comment */"
    });
  });
});
