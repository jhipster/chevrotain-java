"use strict";
const Parser = require("../src/index");

describe("explicitGenericInvocation", () => {
  it("simple", () => {
    expect(
      Parser.parse("<boolean> super()", parser =>
        parser.explicitGenericInvocation()
      )
    ).toEqual({
      type: "EXPLICIT_GENERIC_INVOCATION",
      typeArguments: {
        type: "TYPE_LIST",
        list: [
          {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          }
        ]
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
