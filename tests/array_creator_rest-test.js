"use strict";
const Parser = require("../src/index");

describe("arrayCreatorRest", () => {
  it("without expressions", () => {
    expect(
      Parser.parse("[][][]{}", parser => parser.arrayCreatorRest())
    ).toEqual({
      type: "ARRAY_CREATOR_REST",
      expressions: [],
      dimensions: [
        {
          type: "DIMENSION"
        },
        {
          type: "DIMENSION"
        },
        {
          type: "DIMENSION"
        }
      ],
      arrayInitializer: { type: "ARRAY_INITIALIZER", variableInitializers: [] }
    });
  });

  it("with expressions", () => {
    expect(
      Parser.parse("[this][super][]", parser => parser.arrayCreatorRest())
    ).toEqual({
      type: "ARRAY_CREATOR_REST",
      expressions: [
        {
          type: "THIS"
        },
        {
          type: "SUPER"
        }
      ],
      dimensions: [
        {
          type: "DIMENSION"
        }
      ],
      arrayInitializer: undefined
    });
  });
});
