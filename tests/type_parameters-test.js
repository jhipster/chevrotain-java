"use strict";
const Parser = require("../src/index");

describe("typeParameters", () => {
  it("single", () => {
    expect(Parser.parse("<A>", parser => parser.typeParameters())).toEqual({
      type: "TYPE_PARAMETERS",
      parameters: [
        {
          type: "TYPE_PARAMETER",
          annotations: [],
          name: "A",
          typeBound: undefined
        }
      ]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("<A, B>", parser => parser.typeParameters())).toEqual({
      type: "TYPE_PARAMETERS",
      parameters: [
        {
          type: "TYPE_PARAMETER",
          annotations: [],
          name: "A",
          typeBound: undefined
        },
        {
          type: "TYPE_PARAMETER",
          annotations: [],
          name: "B",
          typeBound: undefined
        }
      ]
    });
  });
});
