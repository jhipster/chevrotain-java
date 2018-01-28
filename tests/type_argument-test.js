"use strict";
const Parser = require("../src/index");

describe("typeArgument", () => {
  it("primitiveType", () => {
    expect(Parser.parse("boolean", parser => parser.typeArgument())).toEqual({
      type: "TYPE_ARGUMENT",
      argument: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 0
      },
      super: undefined,
      extends: undefined
    });
  });

  it("questionmark", () => {
    expect(Parser.parse("?", parser => parser.typeArgument())).toEqual({
      type: "TYPE_ARGUMENT",
      argument: {
        type: "QUESTIONMARK"
      },
      super: undefined,
      extends: undefined
    });
  });

  it("primitiveType extends primitiveType", () => {
    expect(
      Parser.parse("boolean extends char", parser => parser.typeArgument())
    ).toEqual({
      type: "TYPE_ARGUMENT",
      argument: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 0
      },
      super: undefined,
      extends: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "char"
        },
        cntSquares: 0
      }
    });
  });

  it("primitiveType super primitiveType", () => {
    expect(
      Parser.parse("boolean super char", parser => parser.typeArgument())
    ).toEqual({
      type: "TYPE_ARGUMENT",
      argument: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "boolean"
        },
        cntSquares: 0
      },
      super: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "char"
        },
        cntSquares: 0
      },
      extends: undefined
    });
  });

  it("questionmark extends primitiveType", () => {
    expect(
      Parser.parse("? extends char", parser => parser.typeArgument())
    ).toEqual({
      type: "TYPE_ARGUMENT",
      argument: {
        type: "QUESTIONMARK"
      },
      super: undefined,
      extends: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "char"
        },
        cntSquares: 0
      }
    });
  });

  it("questionmark super primitiveType", () => {
    expect(
      Parser.parse("? super char", parser => parser.typeArgument())
    ).toEqual({
      type: "TYPE_ARGUMENT",
      argument: {
        type: "QUESTIONMARK"
      },
      super: {
        type: "TYPE_TYPE",
        annotations: [],
        value: {
          type: "PRIMITIVE_TYPE",
          value: "char"
        },
        cntSquares: 0
      },
      extends: undefined
    });
  });
});
