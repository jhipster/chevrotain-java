"use strict";
const Parser = require("../src/index");

describe("assertStatement", () => {
  it("one expression", () => {
    expect(
      Parser.parse("assert this;", parser => parser.assertStatement())
    ).toEqual({
      type: "ASSERT_STATEMENT",
      expressions: [
        {
          type: "THIS"
        }
      ]
    });
  });

  it("multiple expressions", () => {
    expect(
      Parser.parse("assert this:super;", parser => parser.assertStatement())
    ).toEqual({
      type: "ASSERT_STATEMENT",
      expressions: [
        {
          type: "THIS"
        },
        {
          type: "SUPER"
        }
      ]
    });
  });
});
