"use strict";
const Parser = require("../src/index");

describe("innerCreator", () => {
  it("without typeArguments", () => {
    expect(Parser.parse("a()", parser => parser.innerCreator())).toEqual({
      type: "INNER_CREATOR",
      id: "a",
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
    expect(Parser.parse("a<>()", parser => parser.innerCreator())).toEqual({
      type: "INNER_CREATOR",
      id: "a",
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
