"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("atomic", () => {
  it("primary", () => {
    expect(Parser.parse("this", parser => parser.atomic())).to.eql({
      type: "THIS"
    });
  });

  it("creator", () => {
    expect(Parser.parse("new a()", parser => parser.atomic())).to.eql({
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

  it("methodCall", () => {
    expect(Parser.parse("a()", parser => parser.atomic())).to.eql({
      type: "METHOD_CALL",
      name: {
        type: "IDENTIFIER",
        value: "a"
      },
      parameters: undefined
    });
  });
});
