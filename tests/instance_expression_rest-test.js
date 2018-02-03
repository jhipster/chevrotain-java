"use strict";
const Parser = require("../src/index");

describe("instanceofExpressionRest", () => {
  it("simple", () => {
    expect(
      Parser.parse("instanceof boolean", parser =>
        parser.instanceofExpressionRest()
      )
    ).toEqual({
      type: "INSTANCEOF_EXPRESSION_REST",
      typeType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      }
    });
  });
});
