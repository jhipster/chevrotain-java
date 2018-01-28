"use strict";
const Parser = require("../src/index");

describe("classOrInterfaceType", () => {
  it("identifiers", () => {
    expect(
      Parser.parse("A.B", parser => parser.classOrInterfaceType())
    ).toEqual({
      type: "CLASS_OR_INTERFACE_TYPE",
      elements: [
        {
          type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
          name: "A",
          typeArguments: undefined
        },
        {
          type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
          name: "B",
          typeArguments: undefined
        }
      ]
    });
  });

  it("typeArguments", () => {
    expect(
      Parser.parse("A<boolean>.B<char>", parser =>
        parser.classOrInterfaceType()
      )
    ).toEqual({
      type: "CLASS_OR_INTERFACE_TYPE",
      elements: [
        {
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
        },
        {
          type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
          name: "B",
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
                    value: "char"
                  },
                  cntSquares: 0
                },
                super: undefined,
                extends: undefined
              }
            ]
          }
        }
      ]
    });
  });
});
