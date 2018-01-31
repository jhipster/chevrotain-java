"use strict";
const Parser = require("../src/index");

describe("simpleCreator", () => {
  it("rest classCreatorRest", () => {
    expect(Parser.parse("a()", parser => parser.simpleCreator())).toEqual({
      type: "SIMPLE_CREATOR",
      name: {
        type: "IDENTIFIER_NAME",
        elements: [
          {
            type: "IDENTIFIER_NAME_ELEMENT",
            id: "a",
            typeArguments: undefined
          }
        ]
      },
      rest: {
        type: "CLASS_CREATOR_REST",
        arguments: {
          type: "ARGUMENTS"
        },
        body: undefined
      }
    });
  });

  it("rest arrayCreatorRest", () => {
    expect(Parser.parse("a[]{}", parser => parser.simpleCreator())).toEqual({
      type: "SIMPLE_CREATOR",
      name: {
        type: "IDENTIFIER_NAME",
        elements: [
          {
            type: "IDENTIFIER_NAME_ELEMENT",
            id: "a",
            typeArguments: undefined
          }
        ]
      },
      rest: {
        type: "ARRAY_CREATOR_REST",
        expressions: [],
        cntSquares: 1,
        arrayInitializer: {
          type: "ARRAY_INITIALIZER",
          variableInitializers: []
        }
      }
    });
  });
});
