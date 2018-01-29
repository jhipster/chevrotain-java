"use strict";
const Parser = require("../src/index");

describe("interfaceMethodModifier", () => {
  it("public", () => {
    expect(
      Parser.parse("public", parser => parser.interfaceMethodModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "public"
    });
  });

  it("protected", () => {
    expect(
      Parser.parse("default", parser => parser.interfaceMethodModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "default"
    });
  });

  it("static", () => {
    expect(
      Parser.parse("static", parser => parser.interfaceMethodModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "static"
    });
  });

  it("abstract", () => {
    expect(
      Parser.parse("abstract", parser => parser.interfaceMethodModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "abstract"
    });
  });

  it("strictfp", () => {
    expect(
      Parser.parse("strictfp", parser => parser.interfaceMethodModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "strictfp"
    });
  });

  it("annotation", () => {
    expect(
      Parser.parse("@Bean", parser => parser.interfaceMethodModifier())
    ).toEqual({
      type: "ANNOTATION",
      name: {
        type: "QUALIFIED_NAME",
        name: ["Bean"]
      },
      hasBraces: false
    });
  });
});
