"use strict";
const Parser = require("../src/index");

describe("qualifiedExpressionRest", () => {
  it("methodInvocation", () => {
    expect(
      Parser.parse(".a()", parser => parser.qualifiedExpressionRest())
    ).toEqual({
      type: "METHOD_INVOCATION",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      parameters: undefined
    });
  });

  it("multiple methodInvocations", () => {
    expect(
      Parser.parse(".a().b()", parser => parser.qualifiedExpressionRest())
    ).toEqual({
      type: "QUALIFIED_EXPRESSION",
      expression: {
        type: "METHOD_INVOCATION",
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        parameters: undefined
      },
      rest: {
        type: "METHOD_INVOCATION",
        name: {
          type: "IDENTIFIER",
          value: "b"
        },
        parameters: undefined
      }
    });
  });

  it("identifier", () => {
    expect(
      Parser.parse(".a", parser => parser.qualifiedExpressionRest())
    ).toEqual({
      type: "IDENTIFIER",
      value: "a"
    });
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

  it("class", () => {
    expect(
      Parser.parse(".class", parser => parser.qualifiedExpressionRest())
    ).toEqual({
      type: "CLASS"
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

  it("explicitGenericInvocation", () => {
    expect(
      Parser.parse(".<boolean> super()", parser =>
        parser.qualifiedExpressionRest()
      )
    ).toEqual({
      type: "EXPLICIT_GENERIC_INVOCATION",
      typeArguments: {
        type: "TYPE_ARGUMENTS",
        value: {
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
        arguments: {
          type: "EXPRESSION_LIST",
          list: []
        }
      }
    });
  });
});
