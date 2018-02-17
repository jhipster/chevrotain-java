"use strict";
const Parser = require("../src/index");

describe("methodInvocation", () => {
  it("empty parameters", () => {
    expect(Parser.parse("a()", parser => parser.methodInvocation())).toEqual({
      type: "METHOD_INVOCATION",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      parameters: []
    });
  });

  it("with parameters", () => {
    expect(
      Parser.parse("a(this)", parser => parser.methodInvocation())
    ).toEqual({
      type: "METHOD_INVOCATION",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      parameters: {
        type: "EXPRESSION_LIST",
        list: [
          {
            type: "THIS"
          }
        ]
      }
    });
  });
});
