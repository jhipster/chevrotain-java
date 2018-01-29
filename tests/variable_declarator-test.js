"use strict";
const Parser = require("../src/index");

describe("variableDeclarator", () => {
  it("without init", () => {
    expect(Parser.parse("A", parser => parser.variableDeclarator())).toEqual({
      type: "VARIABLE_DECLARATOR",
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "A",
        cntSquares: 0
      },
      init: undefined
    });
  });
});
