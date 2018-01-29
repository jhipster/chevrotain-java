"use strict";
const Parser = require("../src/index");

describe("compilationUnit", () => {
  it("empty", () => {
    expect(Parser.parse("", parser => parser.compilationUnit())).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: []
    });
  });

  it("package", () => {
    expect(
      Parser.parse("package pkg.name;", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: {
        type: "PACKAGE_DECLARATION",
        name: {
          type: "QUALIFIED_NAME",
          name: ["pkg", "name"]
        }
      },
      imports: [],
      types: []
    });
  });

  it("single import", () => {
    expect(
      Parser.parse("import pkg.name;", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [
        {
          type: "IMPORT_DECLARATION",
          static: false,
          name: {
            type: "QUALIFIED_NAME",
            name: ["pkg", "name"]
          }
        }
      ],
      types: []
    });
  });

  it("multiple imports", () => {
    expect(
      Parser.parse("import pkg.name;\nimport static some.other;", parser =>
        parser.compilationUnit()
      )
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [
        {
          type: "IMPORT_DECLARATION",
          static: false,
          name: {
            type: "QUALIFIED_NAME",
            name: ["pkg", "name"]
          }
        },
        {
          type: "IMPORT_DECLARATION",
          static: true,
          name: {
            type: "QUALIFIED_NAME",
            name: ["some", "other"]
          }
        }
      ],
      types: []
    });
  });

  it("single class", () => {
    expect(
      Parser.parse("class A{}", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "CLASS_DECLARATION",
            name: "A",
            body: {
              type: "CLASS_BODY",
              declarations: []
            }
          }
        }
      ]
    });
  });

  it("multiple classes", () => {
    expect(
      Parser.parse("class A{}\nclass B{}", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "CLASS_DECLARATION",
            name: "A",
            body: {
              type: "CLASS_BODY",
              declarations: []
            }
          }
        },
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "CLASS_DECLARATION",
            name: "B",
            body: {
              type: "CLASS_BODY",
              declarations: []
            }
          }
        }
      ]
    });
  });

  it("single enum", () => {
    expect(
      Parser.parse("enum A{}", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "ENUM_DECLARATION",
            name: "A"
          }
        }
      ]
    });
  });

  it("multiple enums", () => {
    expect(
      Parser.parse("enum A{}\nenum B{}", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "ENUM_DECLARATION",
            name: "A"
          }
        },
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "ENUM_DECLARATION",
            name: "B"
          }
        }
      ]
    });
  });

  it("single interface", () => {
    expect(
      Parser.parse("interface A{}", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "INTERFACE_DECLARATION",
            name: "A",
            body: {
              type: "INTERFACE_BODY",
              declarations: []
            }
          }
        }
      ]
    });
  });

  it("multiple interfaces", () => {
    expect(
      Parser.parse("interface A{}\ninterface B{}", parser =>
        parser.compilationUnit()
      )
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "INTERFACE_DECLARATION",
            name: "A",
            body: {
              type: "INTERFACE_BODY",
              declarations: []
            }
          }
        },
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "INTERFACE_DECLARATION",
            name: "B",
            body: {
              type: "INTERFACE_BODY",
              declarations: []
            }
          }
        }
      ]
    });
  });

  it("single annotationTypeInterface", () => {
    expect(
      Parser.parse("@interface A{}", parser => parser.compilationUnit())
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "ANNOTATION_TYPE_DECLARATION",
            name: "A",
            body: {
              type: "ANNOTATION_TYPE_BODY",
              declarations: []
            }
          }
        }
      ]
    });
  });

  it("multiple annotationTypeInterface", () => {
    expect(
      Parser.parse("@interface A{}\n@interface B{}", parser =>
        parser.compilationUnit()
      )
    ).toEqual({
      type: "COMPILATION_UNIT",
      package: undefined,
      imports: [],
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "ANNOTATION_TYPE_DECLARATION",
            name: "A",
            body: {
              type: "ANNOTATION_TYPE_BODY",
              declarations: []
            }
          }
        },
        {
          type: "TYPE_DECLARATION",
          modifiers: [],
          declaration: {
            type: "ANNOTATION_TYPE_DECLARATION",
            name: "B",
            body: {
              type: "ANNOTATION_TYPE_BODY",
              declarations: []
            }
          }
        }
      ]
    });
  });
});
