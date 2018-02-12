"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("creator", () => {
  it("nonWildcardCreator", () => {
    expect(
      Parser.parse("new <boolean> a()", parser => parser.creator())
    ).to.eql({
      type: "NON_WILDCARD_CREATOR",
      typeArguments: {
        type: "NON_WILDCARD_TYPE_ARGUMENTS",
        typeList: {
          type: "TYPE_LIST",
          list: [
            {
              type: "PRIMITIVE_TYPE",
              value: "boolean"
            }
          ]
        }
      },
      name: {
        type: "IDENTIFIER_NAME",
        elements: [
          {
            type: "IDENTIFIER_NAME_ELEMENT",
            id: {
              type: "IDENTIFIER",
              value: "a"
            },
            typeArguments: undefined
          }
        ]
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

  it("simpleCreator", () => {
    expect(Parser.parse("new a()", parser => parser.creator())).to.eql({
      type: "SIMPLE_CREATOR",
      name: {
        type: "IDENTIFIER_NAME",
        elements: [
          {
            type: "IDENTIFIER_NAME_ELEMENT",
            id: {
              type: "IDENTIFIER",
              value: "a"
            },
            typeArguments: undefined
          }
        ]
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
