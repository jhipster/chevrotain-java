"use strict";
const Parser = require("../src/index");

describe("typeDeclaration", () => {
  it("empty", () => {
    expect(
      Parser.parse("class A{}", parser => parser.typeDeclaration())
    ).toEqual({
      type: "TYPE_DECLARATION",
      modifiers: [],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("public", () => {
    expect(
      Parser.parse("public class A{}", parser => parser.typeDeclaration())
    ).toEqual({
      type: "TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "public"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("protected", () => {
    expect(
      Parser.parse("protected class A{}", parser => parser.typeDeclaration())
    ).toEqual({
      type: "TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "protected"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("private", () => {
    expect(
      Parser.parse("private class A{}", parser => parser.typeDeclaration())
    ).toEqual({
      type: "TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "private"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("static", () => {
    expect(
      Parser.parse("static class A{}", parser => parser.typeDeclaration())
    ).toEqual({
      type: "TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "static"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("abstract", () => {
    expect(
      Parser.parse("abstract class A{}", parser => parser.typeDeclaration())
    ).toEqual({
      type: "TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "abstract"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("final", () => {
    expect(
      Parser.parse("final class A{}", parser => parser.typeDeclaration())
    ).toEqual({
      type: "TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "final"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("strictfp", () => {
    expect(
      Parser.parse("strictfp class A{}", parser => parser.typeDeclaration())
    ).toEqual({
      type: "TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "strictfp"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });

  it("multiple modifiers", () => {
    expect(
      Parser.parse("public abstract class A{}", parser =>
        parser.typeDeclaration()
      )
    ).toEqual({
      type: "TYPE_DECLARATION",
      modifiers: [
        {
          type: "MODIFIER",
          value: "public"
        },
        {
          type: "MODIFIER",
          value: "abstract"
        }
      ],
      declaration: {
        type: "CLASS_DECLARATION",
        name: {
          type: "IDENTIFIER",
          value: "A"
        },
        body: {
          type: "CLASS_BODY",
          declarations: []
        }
      }
    });
  });
});
