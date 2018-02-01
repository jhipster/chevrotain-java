"use strict";
const Parser = require("../src/index");

describe("methodReferenceRest", () => {
  it("identifier", () => {
    expect(Parser.parse("::A", parser => parser.methodReferenceRest())).toEqual(
      {
        type: "METHOD_REFERENCE_REST",
        typeArguments: undefined,
        name: "A"
      }
    );
  });

  it("new", () => {
    expect(
      Parser.parse("::new", parser => parser.methodReferenceRest())
    ).toEqual({
      type: "METHOD_REFERENCE_REST",
      typeArguments: undefined,
      name: {
        type: "NEW"
      }
    });
  });

  it("typeArguments", () => {
    expect(
      Parser.parse("::<B>A", parser => parser.methodReferenceRest())
    ).toEqual({
      type: "METHOD_REFERENCE_REST",
      typeArguments: {
        type: "TYPE_ARGUMENTS",
        arguments: [
          {
            type: "TYPE_ARGUMENT",
            argument: {
              type: "TYPE_TYPE",
              annotations: [],
              value: {
                type: "CLASS_OR_INTERFACE_TYPE",
                elements: [
                  {
                    type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
                    typeArguments: undefined,
                    name: "B"
                  }
                ]
              },
              cntSquares: 0
            },
            extends: undefined,
            super: undefined
          }
        ]
      },
      name: "A"
    });
  });
});
