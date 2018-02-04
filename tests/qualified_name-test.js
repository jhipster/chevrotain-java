"use strict";
const Parser = require("../src/index");

describe("qualifiedName", () => {
  it("single", () => {
    expect(Parser.parse("pkg", parser => parser.qualifiedName())).toEqual({
      type: "QUALIFIED_NAME",
      name: [
        {
          type: "IDENTIFIER",
          value: "pkg"
        }
      ]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("pkg.name", parser => parser.qualifiedName())).toEqual({
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
    });
  });
});
