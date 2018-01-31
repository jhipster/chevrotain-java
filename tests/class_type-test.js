"use strict";
const Parser = require("../src/index");

describe("classType", () => {
  it("simple", () => {
    expect(Parser.parse("A", parser => parser.classType())).toEqual({
      type: "CLASS_TYPE",
      annotations: [],
      classOrInterfaceType: {
        type: "CLASS_OR_INTERFACE_TYPE",
        elements: [
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "A",
            typeArguments: undefined
          }
        ]
      }
    });
  });

  it("classOrInterfaceType", () => {
    expect(Parser.parse("A.B.C", parser => parser.classType())).toEqual({
      type: "CLASS_TYPE",
      annotations: [],
      classOrInterfaceType: {
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
          },
          {
            type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
            name: "C",
            typeArguments: undefined
          }
        ]
      }
    });
  });
});
