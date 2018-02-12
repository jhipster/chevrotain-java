"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("typeParameters", () => {
  it("single", () => {
    expect(Parser.parse("<A>", parser => parser.typeParameters())).to.eql({
      type: "TYPE_PARAMETERS",
      parameters: [
        {
          type: "TYPE_PARAMETER",
          annotations: [],
          name: {
            type: "IDENTIFIER",
            value: "A"
          },
          typeBound: undefined
        }
      ]
    });
  });

  it("multiple", () => {
    expect(Parser.parse("<A, B>", parser => parser.typeParameters())).to.eql({
      type: "TYPE_PARAMETERS",
      parameters: [
        {
          type: "TYPE_PARAMETER",
          annotations: [],
          name: {
            type: "IDENTIFIER",
            value: "A"
          },
          typeBound: undefined
        },
        {
          type: "TYPE_PARAMETER",
          annotations: [],
          name: {
            type: "IDENTIFIER",
            value: "B"
          },
          typeBound: undefined
        }
      ]
    });
  });
});
