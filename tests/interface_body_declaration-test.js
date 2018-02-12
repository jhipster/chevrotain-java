"use strict";
const Parser = require("../src/index");
const expect = require("chai").expect;

describe("interfaceBodyDeclaration", () => {
  it("simple", () => {
    expect(
      Parser.parse("void a() {}", parser => parser.interfaceBodyDeclaration())
    ).to.eql({
      type: "INTERFACE_BODY_DECLARATION",
      modifiers: [],
      declaration: {
        type: "INTERFACE_METHOD_DECLARATION",
        modifiers: [],
        typeParameters: undefined,
        typeType: {
          type: "VOID"
        },
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        parameters: {
          type: "FORMAL_PARAMETERS",
          parameters: undefined
        },
        cntSquares: 0,
        throws: undefined,
        body: {
          type: "BLOCK",
          statements: []
        }
      }
    });
  });

  it("one modifier", () => {
    expect(
      Parser.parse("@Bean void a() {}", parser =>
        parser.interfaceBodyDeclaration()
      )
    ).to.eql({
      type: "INTERFACE_BODY_DECLARATION",
      modifiers: [
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
      declaration: {
        type: "INTERFACE_METHOD_DECLARATION",
        modifiers: [],
        typeParameters: undefined,
        typeType: {
          type: "VOID"
        },
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        parameters: {
          type: "FORMAL_PARAMETERS",
          parameters: undefined
        },
        cntSquares: 0,
        throws: undefined,
        body: {
          type: "BLOCK",
          statements: []
        }
      }
    });
  });

  it("multiple modifiers", () => {
    expect(
      Parser.parse("@Bean public void a() {}", parser =>
        parser.interfaceBodyDeclaration()
      )
    ).to.eql({
      type: "INTERFACE_BODY_DECLARATION",
      modifiers: [
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
        },
        {
          type: "MODIFIER",
          value: "public"
        }
      ],
      declaration: {
        type: "INTERFACE_METHOD_DECLARATION",
        modifiers: [],
        typeParameters: undefined,
        typeType: {
          type: "VOID"
        },
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        parameters: {
          type: "FORMAL_PARAMETERS",
          parameters: undefined
        },
        cntSquares: 0,
        throws: undefined,
        body: {
          type: "BLOCK",
          statements: []
        }
      }
    });
  });
});
