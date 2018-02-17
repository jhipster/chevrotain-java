"use strict";
const Parser = require("../src/index");

describe("classBodyDeclaration", () => {
  it("classBodyBlock", () => {
    expect(Parser.parse("{}", parser => parser.classBodyDeclaration())).toEqual(
      {
        type: "CLASS_BODY_BLOCK",
        static: false,
        block: {
          type: "BLOCK",
          statements: []
        }
      }
    );
  });

  it("classBodyBlock - static", () => {
    expect(
      Parser.parse("static {}", parser => parser.classBodyDeclaration())
    ).toEqual({
      type: "CLASS_BODY_BLOCK",
      static: true,
      block: {
        type: "BLOCK",
        statements: []
      }
    });
  });

  it("classBodyMemberDeclaration", () => {
    expect(
      Parser.parse("void a() {}", parser => parser.classBodyDeclaration())
    ).toEqual({
      type: "CLASS_BODY_MEMBER_DECLARATION",
      modifiers: [],
      declaration: {
        type: "METHOD_DECLARATION",
        typeType: {
          type: "VOID"
        },
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        parameters: {
          type: "FORMAL_PARAMETERS",
          parameters: []
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

  it("classBodyMemberDeclaration - one modifier", () => {
    expect(
      Parser.parse("@Bean void a() {}", parser => parser.classBodyDeclaration())
    ).toEqual({
      type: "CLASS_BODY_MEMBER_DECLARATION",
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
        type: "METHOD_DECLARATION",
        typeType: {
          type: "VOID"
        },
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        parameters: {
          type: "FORMAL_PARAMETERS",
          parameters: []
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

  it("classBodyMemberDeclaration - multiple modifiers", () => {
    expect(
      Parser.parse("@Bean public void a() {}", parser =>
        parser.classBodyDeclaration()
      )
    ).toEqual({
      type: "CLASS_BODY_MEMBER_DECLARATION",
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
        type: "METHOD_DECLARATION",
        typeType: {
          type: "VOID"
        },
        name: {
          type: "IDENTIFIER",
          value: "a"
        },
        parameters: {
          type: "FORMAL_PARAMETERS",
          parameters: []
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
