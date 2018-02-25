"use strict";
const Parser = require("../src/index");

describe("arrayCreatorRest", () => {
  it("without expressions", () => {
    expect(
      Parser.parse("[][][]{}", parser => parser.arrayCreatorRest())
    ).toEqual({
      type: "ARRAY_CREATOR_REST",
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
      dimensions: [
        {
          type: "DIMENSION",
          expression: {
            type: "THIS"
          }
        },
        {
          type: "DIMENSION",
          expression: {
            type: "SUPER"
          }
        },
        {
          type: "DIMENSION"
        }
      ],
      arrayInitializer: undefined
    });
  });
});
