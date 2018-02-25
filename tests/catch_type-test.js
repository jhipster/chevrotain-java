"use strict";
const Parser = require("../src/index");

describe("catchType", () => {
  it("single", () => {
    expect(Parser.parse("pkg", parser => parser.catchType())).toEqual({
      type: "CATCH_TYPE",
      list: [
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
    expect(Parser.parse("pkg | abc", parser => parser.catchType())).toEqual({
      type: "CATCH_TYPE",
      list: [
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
