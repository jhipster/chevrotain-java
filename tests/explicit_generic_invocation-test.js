"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("explicitGenericInvocation", () => {
  it("simple", () => {
    expect(
      Parser.parse("<boolean> super()", parser =>
        parser.explicitGenericInvocation()
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
