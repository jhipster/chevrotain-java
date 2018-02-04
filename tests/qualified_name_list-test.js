"use strict";
const Parser = require("../src/index");

describe("qualifiedNameList", () => {
  it("single", () => {
    expect(Parser.parse("pkg", parser => parser.qualifiedNameList())).toEqual({
      type: "QUALIFIED_NAME_LIST",
      list: [
        {
          type: "QUALIFIED_NAME",
          name: [
            {
              type: "IDENTIFIER",
              value: "pkg"
            }
          ]
        }
      ]
    });
  });

  it("multiple", () => {
    expect(
      Parser.parse("pkg,abc", parser => parser.qualifiedNameList())
    ).toEqual({
      type: "QUALIFIED_NAME_LIST",
      list: [
        {
          type: "QUALIFIED_NAME",
          name: [
            {
              type: "IDENTIFIER",
              value: "pkg"
            }
          ]
        },
        {
          type: "QUALIFIED_NAME",
          name: [
            {
              type: "IDENTIFIER",
              value: "abc"
            }
          ]
        }
      ]
    });
  });
});
