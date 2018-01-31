"use strict";
const Parser = require("../src/index");

describe("arrayInitializer", () => {
  it("empty", () => {
    expect(Parser.parse("{}", parser => parser.arrayInitializer())).toEqual({
      type: "ARRAY_INITIALIZER",
      variableInitializers: []
    });
  });

  it("with variable initializer", () => {
    expect(Parser.parse("{this}", parser => parser.arrayInitializer())).toEqual(
      {
        type: "ARRAY_INITIALIZER",
        variableInitializers: [
          {
            type: "THIS"
          }
        ]
      }
    );
  });

  it("comma after last element", () => {
    expect(
      Parser.parse("{this,super,}", parser => parser.arrayInitializer())
    ).toEqual({
      type: "ARRAY_INITIALIZER",
      variableInitializers: [
        {
          type: "THIS"
        },
        {
          type: "SUPER"
        }
      ]
    });
  });
});
