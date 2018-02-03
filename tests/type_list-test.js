"use strict";
const Parser = require("../src/index");

describe("typeList", () => {
  it("single", () => {
    expect(Parser.parse("boolean", parser => parser.typeList())).toEqual({
      type: "TYPE_LIST",
      list: [
        {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        }
      ]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("boolean, char", parser => parser.typeList())).toEqual({
      type: "TYPE_LIST",
      list: [
        {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        {
          type: "PRIMITIVE_TYPE",
          value: "char"
        }
      ]
    });
  });
});
