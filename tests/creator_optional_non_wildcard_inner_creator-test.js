"use strict";
const Parser = require("../src/index");

describe("creatorOptionalNonWildcardInnerCreator", () => {
  it("without typeArguments", () => {
    expect(
      Parser.parse("new a()", parser =>
        parser.creatorOptionalNonWildcardInnerCreator()
      )
    ).toEqual({
      type: "CREATOR_OPTIONAL_NON_WILDCARD_INNER_CREATOR",
      typeArguments: undefined,
      innerCreator: {
        type: "INNER_CREATOR",
        id: {
          type: "IDENTIFIER",
          value: "a"
        },
        typeArguments: undefined,
        rest: {
          type: "CLASS_CREATOR_REST",
          arguments: {
            type: "EXPRESSION_LIST",
            list: []
          },
          body: undefined
        }
      }
    });
  });

  it("with typeArguments", () => {
    expect(
      Parser.parse("new <boolean> a()", parser =>
        parser.creatorOptionalNonWildcardInnerCreator()
      )
    ).toEqual({
      type: "CREATOR_OPTIONAL_NON_WILDCARD_INNER_CREATOR",
      typeArguments: {
        type: "NON_WILDCARD_TYPE_ARGUMENTS",
        typeList: {
          type: "TYPE_LIST",
          list: [
            {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            }
          ]
        }
      },
      innerCreator: {
        type: "INNER_CREATOR",
        id: {
          type: "IDENTIFIER",
          value: "a"
        },
        typeArguments: undefined,
        rest: {
          type: "CLASS_CREATOR_REST",
          arguments: {
            type: "EXPRESSION_LIST",
            list: []
          },
          body: undefined
        }
      }
    });
  });
});
