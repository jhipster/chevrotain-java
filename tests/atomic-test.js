"use strict";
const Parser = require("../src/index");

describe("atomic", () => {
  it("primary", () => {
    expect(Parser.parse("this", parser => parser.atomic())).toEqual({
      type: "THIS"
    });
  });

  it("creator", () => {
    expect(Parser.parse("new a()", parser => parser.atomic())).toEqual({
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
          type: "ARGUMENTS"
        },
        body: undefined
      }
    });
  });

  it("methodInvocation", () => {
    expect(Parser.parse("a()", parser => parser.atomic())).toEqual({
      type: "METHOD_INVOCATION",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      parameters: []
    });
  });
});
