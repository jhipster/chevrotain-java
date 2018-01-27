"use strict";
const Parser = require("../src/index");

describe("elementValueArrayInitializer", () => {
  it("single", () => {
    expect(
      Parser.parse("{@Something}", parser =>
        parser.elementValueArrayInitializer()
      )
    ).toEqual({
      type: "ELEMENT_VALUE_ARRAY_INITIALIZER",
      values: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["Something"]
          },
          hasBraces: false,
          value: undefined
        }
      ]
    });
  });

  it("multiple", () => {
    expect(
      Parser.parse("{@Something, @Another}", parser =>
        parser.elementValueArrayInitializer()
      )
    ).toEqual({
      type: "ELEMENT_VALUE_ARRAY_INITIALIZER",
      values: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["Something"]
          },
          hasBraces: false,
          value: undefined
        },
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["Another"]
          },
          hasBraces: false,
          value: undefined
        }
      ]
    });
  });
  it("comma at the end", () => {
    expect(
      Parser.parse("{@Something,}", parser =>
        parser.elementValueArrayInitializer()
      )
    ).toEqual({
      type: "ELEMENT_VALUE_ARRAY_INITIALIZER",
      values: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: ["Something"]
          },
          hasBraces: false,
          value: undefined
        }
      ]
    });
  });
});
