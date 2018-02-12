"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("qualifiedExpressionRest", () => {
  it("methodCall", () => {
    expect(
      Parser.parse(".a()", parser => parser.qualifiedExpressionRest())
    ).to.eql({
      type: "METHOD_CALL",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      parameters: undefined
    });
  });

  it("identifier", () => {
    expect(
      Parser.parse(".a", parser => parser.qualifiedExpressionRest())
    ).to.eql({
      type: "IDENTIFIER",
      value: "a"
    });
  });

  it("this", () => {
    expect(
      Parser.parse(".this", parser => parser.qualifiedExpressionRest())
    ).to.eql({
      type: "THIS"
    });
  });

  it("super", () => {
    expect(
      Parser.parse(".super", parser => parser.qualifiedExpressionRest())
    ).to.eql({
      type: "SUPER"
    });
  });

  it("creatorOptionalNonWildcardInnerCreator", () => {
    expect(
      Parser.parse(".new a()", parser => parser.qualifiedExpressionRest())
    ).to.eql({
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
    ).to.eql({
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
