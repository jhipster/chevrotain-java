"use strict";
const Parser = require("../src/index");

describe("classCreatorRest", () => {
  it("without body", () => {
    expect(Parser.parse("()", parser => parser.classCreatorRest())).toEqual({
      type: "CLASS_CREATOR_REST",
      arguments: {
        type: "EXPRESSION_LIST",
        list: []
      },
      body: undefined
    });
  });

  it("with body", () => {
    expect(Parser.parse("() {}", parser => parser.classCreatorRest())).toEqual({
      type: "CLASS_CREATOR_REST",
      arguments: {
        type: "EXPRESSION_LIST",
        list: []
      },
      body: {
        type: "CLASS_BODY",
        declarations: []
      }
    });
  });
});
