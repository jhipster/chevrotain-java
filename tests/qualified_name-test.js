"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("qualifiedName", () => {
  it("single", () => {
    expect(Parser.parse("pkg", parser => parser.qualifiedName())).to.eql({
      type: "QUALIFIED_NAME",
      name: [
        {
          type: "IDENTIFIER",
          value: "pkg"
        }
      ]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("pkg.name", parser => parser.qualifiedName())).to.eql({
      type: "QUALIFIED_NAME",
      name: [
        {
          type: "IDENTIFIER",
          value: "pkg"
        },
        {
          type: "IDENTIFIER",
          value: "name"
        }
      ]
    });
  });
});
