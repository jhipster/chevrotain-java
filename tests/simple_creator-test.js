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
            id: {
              type: "IDENTIFIER",
              value: "a"
            },
            typeArguments: undefined
          }
        ]
      },
      rest: {
        type: "CLASS_CREATOR_REST",
        arguments: {
          type: "EXPRESSION_LIST",
          list: []
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
            id: {
              type: "IDENTIFIER",
              value: "a"
            },
            typeArguments: undefined
          }
        ]
      },
      rest: {
        type: "ARRAY_CREATOR_REST",
        expressions: [],
        dimensions: [
          {
            type: "DIMENSION"
          }
        ],
        arrayInitializer: {
          type: "ARRAY_INITIALIZER",
          variableInitializers: []
        }
      }
    });
  });
});
