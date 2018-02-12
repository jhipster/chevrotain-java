"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("instanceofExpressionRest", () => {
  it("simple", () => {
    expect(
      Parser.parse("instanceof boolean", parser =>
        parser.instanceofExpressionRest()
      )
    ).to.eql({
      type: "INSTANCEOF_EXPRESSION_REST",
      typeType: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      }
    });
  });
});
