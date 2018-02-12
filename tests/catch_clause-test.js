"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("catchClause", () => {
  it("simple", () => {
    expect(
      Parser.parse("catch (A e) {}", parser => parser.catchClause())
    ).to.eql({
      type: "CATCH_CLAUSE",
      modifiers: [],
      catchType: {
        type: "CATCH_TYPE",
        types: [
          {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "A"
              }
            ]
          }
        ]
      },
      id: {
        type: "IDENTIFIER",
        value: "e"
      },
      block: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("one modifier", () => {
    expect(
      Parser.parse("catch (@Bean A e) {}", parser => parser.catchClause())
    ).to.eql({
      type: "CATCH_CLAUSE",
      modifiers: [
        {
          type: "ANNOTATION",
          value: undefined,
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Bean"
              }
            ]
          },
          hasBraces: false
        }
      ],
      catchType: {
        type: "CATCH_TYPE",
        types: [
          {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "A"
              }
            ]
          }
        ]
      },
      id: {
        type: "IDENTIFIER",
        value: "e"
      },
      block: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("multiple modifiers", () => {
    expect(
      Parser.parse("catch (@Bean final A e) {}", parser => parser.catchClause())
    ).to.eql({
      type: "CATCH_CLAUSE",
      modifiers: [
        {
          type: "ANNOTATION",
          value: undefined,
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Bean"
              }
            ]
          },
          hasBraces: false
        },
        {
          type: "MODIFIER",
          value: "final"
        }
      ],
      catchType: {
        type: "CATCH_TYPE",
        types: [
          {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "A"
              }
            ]
          }
        ]
      },
      id: {
        type: "IDENTIFIER",
        value: "e"
      },
      block: {
        type: "BLOCK",
        statements: []
      }
    });
  });
});
