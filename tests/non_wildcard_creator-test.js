"use strict";
const Parser = require("../src/index");

describe("nonWildcardCreator", () => {
  it("simple", () => {
    expect(
      Parser.parse("<boolean> a()", parser => parser.nonWildcardCreator())
    ).toEqual({
      type: "NON_WILDCARD_CREATOR",
      typeArguments: {
        type: "NON_WILDCARD_TYPE_ARGUMENTS",
        typeList: {
          type: "TYPE_LIST",
          list: [
            {
              type: "TYPE_TYPE",
              annotations: [],
              value: {
                type: "PRIMITIVE_TYPE",
                value: "boolean"
              },
              cntSquares: 0
            }
          ]
        }
      },
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
});
