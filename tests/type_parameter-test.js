"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("typeParameter", () => {
  it("identifier", () => {
    expect(Parser.parse("A", parser => parser.typeParameter())).to.eql({
      type: "TYPE_PARAMETER",
      annotations: [],
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      typeBound: undefined
    });
  });

  it("annotations", () => {
    expect(Parser.parse("@Bean A", parser => parser.typeParameter())).to.eql({
      type: "TYPE_PARAMETER",
      annotations: [
        {
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
        }
      ],
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      typeBound: undefined
    });
  });

  it("typeBound", () => {
    expect(
      Parser.parse("A extends boolean", parser => parser.typeParameter())
    ).to.eql({
      type: "TYPE_PARAMETER",
      annotations: [],
      name: {
        type: "IDENTIFIER",
        value: "A"
      },
      typeBound: {
        type: "TYPE_BOUND",
        bounds: [
          {
            type: "PRIMITIVE_TYPE",
            value: "boolean"
          }
        ]
      }
    });
  });
});
