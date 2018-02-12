"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("innerCreator", () => {
  it("without typeArguments", () => {
    expect(Parser.parse("a()", parser => parser.innerCreator())).to.eql({
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
    });
  });

  it("with typeArguments", () => {
    expect(Parser.parse("a<>()", parser => parser.innerCreator())).to.eql({
      type: "INNER_CREATOR",
      id: {
        type: "IDENTIFIER",
        value: "a"
      },
      typeArguments: {
        type: "EMPTY_DIAMOND"
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
});
