"use strict";
const Parser = require("../src/index");

describe("switchLabelCase", () => {
  it("identifier", () => {
    expect(Parser.parse("case a:", parser => parser.switchLabelCase())).toEqual(
      {
        type: "SWITCH_LABEL_CASE",
        case: {
          type: "IDENTIFIER",
          value: "a"
        }
      }
    );
  });
});
