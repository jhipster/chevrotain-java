"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("createdName", () => {
  it("identifierName", () => {
    expect(Parser.parse("a", parser => parser.createdName())).to.eql({
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
    });
  });

  it("primitiveType", () => {
    expect(Parser.parse("boolean", parser => parser.createdName())).to.eql({
      type: "PRIMITIVE_TYPE",
      value: "boolean"
    });
  });
});
