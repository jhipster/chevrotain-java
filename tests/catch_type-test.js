"use strict";
const Parser = require("../src/index");

describe("catchType", () => {
  it("single", () => {
    expect(Parser.parse("pkg", parser => parser.catchType())).toEqual({
      type: "CATCH_TYPE",
      types: [
        {
          type: "QUALIFIED_NAME",
          name: ["pkg"]
        }
      ]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("pkg | abc", parser => parser.catchType())).toEqual({
      type: "CATCH_TYPE",
      types: [
        {
          type: "QUALIFIED_NAME",
          name: ["pkg"]
        },
        {
          type: "QUALIFIED_NAME",
          name: ["abc"]
        }
      ]
    });
  });
});
