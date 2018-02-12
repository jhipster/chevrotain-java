"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("variableInitializer", () => {
  it("expression", () => {
    expect(Parser.parse("this", parser => parser.variableInitializer())).to.eql(
      {
        type: "THIS"
      }
    );
  });

  it("arrayInitializer", () => {
    expect(Parser.parse("{}", parser => parser.variableInitializer())).to.eql({
      type: "ARRAY_INITIALIZER",
      variableInitializers: []
    });
  });
});
