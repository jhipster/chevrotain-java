"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("typeList", () => {
  it("single", () => {
    expect(Parser.parse("boolean", parser => parser.typeList())).to.eql({
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
    expect(Parser.parse("boolean, char", parser => parser.typeList())).to.eql({
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
