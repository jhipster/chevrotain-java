"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("arrayCreatorRest", () => {
  it("without expressions", () => {
    expect(
      Parser.parse("[][][]{}", parser => parser.arrayCreatorRest())
    ).to.eql({
      type: "ARRAY_CREATOR_REST",
      expressions: [],
      cntSquares: 3,
      arrayInitializer: { type: "ARRAY_INITIALIZER", variableInitializers: [] }
    });
  });

  it("with expressions", () => {
    expect(
      Parser.parse("[this][super][]", parser => parser.arrayCreatorRest())
    ).to.eql({
      type: "ARRAY_CREATOR_REST",
      expressions: [
        {
          type: "THIS"
        },
        {
          type: "SUPER"
        }
      ],
      cntSquares: 1,
      arrayInitializer: undefined
    });
  });
});
