"use strict";
const Parser = require("../src/index");

describe("qualifiedExpressionRest", () => {
  it("methodCall", () => {
    expect(
      Parser.parse(".a()", parser => parser.qualifiedExpressionRest())
    ).toEqual({
      type: "METHOD_CALL",
      name: "a",
      parameters: undefined
    });
  });

  it("identifier", () => {
    expect(
      Parser.parse(".a", parser => parser.qualifiedExpressionRest())
    ).toEqual("a");
  });

  it("this", () => {
    expect(
      Parser.parse(".this", parser => parser.qualifiedExpressionRest())
    ).toEqual({
      type: "THIS"
    });
  });

  it("super", () => {
    expect(
      Parser.parse(".super", parser => parser.qualifiedExpressionRest())
    ).toEqual({
      type: "SUPER"
    });
  });

  it("creatorOptionalNonWildcardInnerCreator", () => {
    expect(
      Parser.parse(".new a()", parser => parser.qualifiedExpressionRest())
    ).toEqual({
      type: "CREATOR_OPTIONAL_NON_WILDCARD_INNER_CREATOR",
      typeArguments: undefined,
      innerCreator: {
        type: "INNER_CREATOR",
        id: "a",
        typeArguments: undefined,
        rest: {
          type: "CLASS_CREATOR_REST",
          arguments: {
            type: "ARGUMENTS"
          },
          body: undefined
        }
      }
    });
  });

  it("explicitGenericInvocation", () => {
    expect(
      Parser.parse(".<boolean> super()", parser =>
        parser.qualifiedExpressionRest()
      )
    ).toEqual({
      type: "EXPLICIT_GENERIC_INVOCATION",
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
      invocation: {
        type: "SUPER",
        value: {
          type: "ARGUMENTS"
        }
      }
    });
  });
});
