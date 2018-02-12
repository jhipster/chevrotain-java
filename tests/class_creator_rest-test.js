"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("classCreatorRest", () => {
  it("without body", () => {
    expect(Parser.parse("()", parser => parser.classCreatorRest())).to.eql({
      type: "CLASS_CREATOR_REST",
      arguments: {
        type: "ARGUMENTS"
      },
      body: undefined
    });
  });

  it("with body", () => {
    expect(Parser.parse("() {}", parser => parser.classCreatorRest())).to.eql({
      type: "CLASS_CREATOR_REST",
      arguments: {
        type: "ARGUMENTS"
      },
      body: {
        type: "CLASS_BODY",
        declarations: []
      }
    });
  });
});
