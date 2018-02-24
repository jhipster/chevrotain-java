"use strict";
const Parser = require("../src/index");

describe("methodReferenceRest", () => {
  it("identifier", () => {
    expect(Parser.parse("::A", parser => parser.methodReferenceRest())).toEqual(
      {
        type: "METHOD_REFERENCE_REST",
        typeArguments: undefined,
        name: {
          type: "IDENTIFIER",
          value: "A"
        }
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
        list: [
          {
            type: "TYPE_ARGUMENT",
            argument: {
              type: "IDENTIFIER",
              value: "B"
            },
            extends: undefined,
            super: undefined
          }
        ]
      },
      name: {
        type: "IDENTIFIER",
        value: "A"
      }
    });
  });
});
