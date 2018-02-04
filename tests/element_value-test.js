"use strict";
const Parser = require("../src/index");

describe("elementValue", () => {
  it("elementValue is annotation", () => {
    expect(Parser.parse("@Bean", parser => parser.elementValue())).toEqual({
      type: "ANNOTATION",
      name: {
        type: "QUALIFIED_NAME",
        name: [
          {
            type: "IDENTIFIER",
            value: "Bean"
          }
        ]
      },
      hasBraces: false,
      value: undefined
    });
  });

  it("elementValue is expression", () => {
    expect(Parser.parse("this", parser => parser.elementValue())).toEqual({
      type: "THIS"
    });
  });

  it("elementValue is elementValueArrayInitializer", () => {
    expect(
      Parser.parse("{@Something}", parser => parser.elementValue())
    ).toEqual({
      type: "ELEMENT_VALUE_ARRAY_INITIALIZER",
      values: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Something"
              }
            ]
          },
          hasBraces: false,
          value: undefined
        }
      ]
    });
  });
});
