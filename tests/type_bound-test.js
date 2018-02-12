"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("typeBound", () => {
  it("single", () => {
    expect(Parser.parse("boolean", parser => parser.typeBound())).to.eql({
      type: "TYPE_BOUND",
      bounds: [
        {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        }
      ]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("boolean & char", parser => parser.typeBound())).to.eql(
      {
        type: "TYPE_BOUND",
        bounds: [
          {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          },
          {
            type: "PRIMITIVE_TYPE",
            value: "char"
          }
        ]
      }
    );
  });
});
