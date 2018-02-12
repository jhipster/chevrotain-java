"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("annotationConstantRest", () => {
  it("simple", () => {
    expect(Parser.parse("A", parser => parser.annotationConstantRest())).to.eql(
      {
        type: "VARIABLE_DECLARATORS",
        list: [
          {
            type: "VARIABLE_DECLARATOR",
            id: {
              type: "VARIABLE_DECLARATOR_ID",
              id: {
                type: "IDENTIFIER",
                value: "A"
              },
              cntSquares: 0
            },
            init: undefined
          }
        ]
      }
    );
  });
});
