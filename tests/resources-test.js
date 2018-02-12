"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("resources", () => {
  it("one resource", () => {
    expect(Parser.parse("A.B a = this", parser => parser.resources())).to.eql({
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
            id: {
              type: "IDENTIFIER",
              value: "a"
            },
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
    ).to.eql({
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
            id: {
              type: "IDENTIFIER",
              value: "a"
            },
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
            id: {
              type: "IDENTIFIER",
              value: "b"
            },
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
