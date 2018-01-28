"use strict";
const Parser = require("../src/index");

describe("modifier", () => {
  it("native", () => {
    expect(Parser.parse("native", parser => parser.modifier())).toEqual({
      type: "MODIFIER",
      value: "native"
    });
  });

  it("synchronized", () => {
    expect(Parser.parse("synchronized", parser => parser.modifier())).toEqual({
      type: "MODIFIER",
      value: "synchronized"
    });
  });

  it("transient", () => {
    expect(Parser.parse("transient", parser => parser.modifier())).toEqual({
      type: "MODIFIER",
      value: "transient"
    });
  });

  it("volatile", () => {
    expect(Parser.parse("volatile", parser => parser.modifier())).toEqual({
      type: "MODIFIER",
      value: "volatile"
    });
  });

  it("public", () => {
    expect(Parser.parse("public", parser => parser.modifier())).toEqual({
      type: "MODIFIER",
      value: "public"
    });
  });
});
