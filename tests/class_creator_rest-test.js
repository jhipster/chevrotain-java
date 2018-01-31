"use strict";
const Parser = require("../src/index");

describe("classCreatorRest", () => {
  it("without body", () => {
    expect(Parser.parse("()", parser => parser.classCreatorRest())).toEqual({
      type: "CLASS_CREATOR_REST",
      arguments: {
        type: "ARGUMENTS"
      },
      body: undefined
    });
  });

  it("with body", () => {
    expect(Parser.parse("() {}", parser => parser.classCreatorRest())).toEqual({
      type: "CLASS_CREATOR_REST",
      arguments: {
        type: "ARGUMENTS"
      },
      body: {
        type: "CLASS_BODY",
        declarations: []
      }
    });
  });
});
