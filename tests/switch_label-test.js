"use strict";
const Parser = require("../src/index");

describe("switchLabel", () => {
  it("switchLabelCase", () => {
    expect(Parser.parse("case a:", parser => parser.switchLabel())).toEqual({
      type: "SWITCH_LABEL_CASE",
      expression: {
        type: "IDENTIFIER",
        value: "a"
      }
    });
  });

  it("switchLabelDefault", () => {
    expect(Parser.parse("default :", parser => parser.switchLabel())).toEqual({
      type: "SWITCH_LABEL_DEFAULT"
    });
  });
});
