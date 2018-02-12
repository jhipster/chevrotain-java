"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("catchType", () => {
  it("single", () => {
    expect(Parser.parse("pkg", parser => parser.catchType())).to.eql({
      type: "CATCH_TYPE",
      types: [
        {
          type: "QUALIFIED_NAME",
          name: [
            {
              type: "IDENTIFIER",
              value: "pkg"
            }
          ]
        }
      ]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("pkg | abc", parser => parser.catchType())).to.eql({
      type: "CATCH_TYPE",
      types: [
        {
          type: "QUALIFIED_NAME",
          name: [
            {
              type: "IDENTIFIER",
              value: "pkg"
            }
          ]
        },
        {
          type: "QUALIFIED_NAME",
          name: [
            {
              type: "IDENTIFIER",
              value: "abc"
            }
          ]
        }
      ]
    });
  });
});
