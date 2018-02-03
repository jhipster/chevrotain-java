"use strict";
const Parser = require("../src/index");

describe("resources", () => {
  it("one resource", () => {
    expect(Parser.parse("A.B a = this", parser => parser.resources())).toEqual({
      type: "RESOURCES",
      resources: [
        {
          type: "RESOURCE",
          modifiers: [],
          typeType: {
            type: "CLASS_OR_INTERFACE_TYPE",
            elements: [
              {
                type: "IDENTIFIER",
                value: "A"
              },
              {
                type: "IDENTIFIER",
                value: "B"
              }
            ]
          },
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "a",
            cntSquares: 0
          },
          expression: {
            type: "THIS"
          }
        }
      ]
    });
  });

  it("multiple resources", () => {
    expect(
      Parser.parse("A.B a = this; B.C b = this", parser => parser.resources())
    ).toEqual({
      type: "RESOURCES",
      resources: [
        {
          type: "RESOURCE",
          modifiers: [],
          typeType: {
            type: "CLASS_OR_INTERFACE_TYPE",
            elements: [
              {
                type: "IDENTIFIER",
                value: "A"
              },
              {
                type: "IDENTIFIER",
                value: "B"
              }
            ]
          },
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "a",
            cntSquares: 0
          },
          expression: {
            type: "THIS"
          }
        },
        {
          type: "RESOURCE",
          modifiers: [],
          typeType: {
            type: "CLASS_OR_INTERFACE_TYPE",
            elements: [
              {
                type: "IDENTIFIER",
                value: "B"
              },
              {
                type: "IDENTIFIER",
                value: "C"
              }
            ]
          },
          id: {
            type: "VARIABLE_DECLARATOR_ID",
            id: "b",
            cntSquares: 0
          },
          expression: {
            type: "THIS"
          }
        }
      ]
    });
  });
});
