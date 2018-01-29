"use strict";
const Parser = require("../src/index");

describe("annotationConstantRest", () => {
  it("simple", () => {
    expect(
      Parser.parse("A", parser => parser.annotationConstantRest())
    ).toEqual({
      type: "VARIABLE_DECLARATORS",
      list: [
        {
          type: "VARIABLE_DECLARATOR",
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "A",
            cntSquares: 0
          },
          init: undefined
        }
      ]
    });
  });
});
