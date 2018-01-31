"use strict";
const Parser = require("../src/index");

describe("forControl", () => {
  it("enhancedForControl", () => {
    expect(
      Parser.parse("boolean a : this", parser => parser.forControl())
    ).toEqual({
      type: "ENHANCED_FOR_CONTROL",
      modifiers: [],
      typeType: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 0
      },
      id: {
        type: "VARIABLE_DECLARATOR_ID",
        id: "a",
        cntSquares: 0
      },
      iterator: {
        type: "THIS"
      }
    });
  });
});
