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
      invocation: {
        type: "SUPER",
        value: {
          type: "ARGUMENTS"
        }
      }
    });
  });
});
