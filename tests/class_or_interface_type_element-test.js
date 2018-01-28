"use strict";
const Parser = require("../src/index");

describe("classOrInterfaceTypeElement", () => {
  it("identifier", () => {
    expect(
      Parser.parse("A", parser => parser.classOrInterfaceTypeElement())
    ).toEqual({
      type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
      name: "A",
      typeArguments: undefined
    });
  });

  it("typeArguments", () => {
    expect(
      Parser.parse("A<boolean>", parser => parser.classOrInterfaceTypeElement())
    ).toEqual({
      type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
      name: "A",
      typeArguments: {
        type: "TYPE_ARGUMENTS",
        arguments: [
          {
            type: "TYPE_ARGUMENT",
            argument: {
              type: "TYPE_TYPE",
              annotations: [],
              value: {
                type: "PRIMITIVE_TYPE",
                value: "boolean"
              },
              cntSquares: 0
            },
            super: undefined,
            extends: undefined
          }
        ]
      }
    });
  });
});
