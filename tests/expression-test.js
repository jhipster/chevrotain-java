"use strict";
const Parser = require("../src/index");

describe("expression", () => {
  it("primary", () => {
    expect(Parser.parse("this", parser => parser.expression())).toEqual({
      type: "THIS"
    });
  });

  it("creator", () => {
    expect(Parser.parse("new a()", parser => parser.expression())).toEqual({
      type: "SIMPLE_CREATOR",
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

  it("methodCall", () => {
    expect(Parser.parse("a()", parser => parser.expression())).toEqual({
      type: "METHOD_CALL",
      name: "a",
      parameters: undefined
    });
  });
});
