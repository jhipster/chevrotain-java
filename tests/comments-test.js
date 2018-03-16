"use strict";
const Parser = require("../src/index");

describe("comment", () => {
  it("line comment before class", () => {
    expect(
      Parser.parse("// comment\nclass A {}", parser => parser.compilationUnit())
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
            name: {
              type: "IDENTIFIER",
              value: "A"
            },
            typeParameters: undefined,
            body: {
              type: "CLASS_BODY",
              declarations: []
            },
            extends: undefined,
            implements: undefined,
            comments: [
              {
                ast_type: "comment",
                leading: true,
                trailing: false,
                value: "// comment"
              }
            ]
          }
        }
      ]
    });
  });

  it("line comment between class and name", () => {
    expect(
      Parser.parse("class \n// comment\n A {}", parser =>
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
            type: "CLASS_DECLARATION",
            name: {
              type: "IDENTIFIER",
              value: "A"
            },
            typeParameters: undefined,
            body: {
              type: "CLASS_BODY",
              declarations: []
            },
            extends: undefined,
            implements: undefined,
            comments: [
              {
                ast_type: "comment",
                leading: true,
                trailing: false,
                value: "// comment"
              }
            ]
          }
        }
      ]
    });
  });

  it("multiple line comment before class", () => {
    expect(
      Parser.parse("// comment1\n// comment2\nclass A {}", parser =>
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
            type: "CLASS_DECLARATION",
            name: {
              type: "IDENTIFIER",
              value: "A"
            },
            typeParameters: undefined,
            body: {
              type: "CLASS_BODY",
              declarations: []
            },
            extends: undefined,
            implements: undefined,
            comments: [
              {
                ast_type: "comment",
                leading: true,
                trailing: false,
                value: "// comment1"
              },
              {
                ast_type: "comment",
                leading: true,
                trailing: false,
                value: "// comment2"
              }
            ]
          }
        }
      ]
    });
  });

  it("line comment after", () => {
    expect(
      Parser.parse("class A {\nint i = 0; // GHI\n}", parser =>
        parser.compilationUnit()
      )
    ).toEqual({
      type: "COMPILATION_UNIT",
      imports: [],
      package: undefined,
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],

          declaration: {
            type: "CLASS_DECLARATION",
            name: { type: "IDENTIFIER", value: "A" },
            typeParameters: undefined,
            body: {
              type: "CLASS_BODY",
              declarations: [
                {
                  type: "CLASS_BODY_MEMBER_DECLARATION",
                  modifiers: [],
                  declaration: {
                    type: "FIELD_DECLARATION",
                    typeType: { type: "PRIMITIVE_TYPE", value: "int" },
                    variableDeclarators: {
                      type: "VARIABLE_DECLARATORS",
                      list: [
                        {
                          type: "VARIABLE_DECLARATOR",
                          id: {
                            type: "VARIABLE_DECLARATOR_ID",
                            id: {
                              type: "IDENTIFIER",
                              value: "i"
                            },
                            dimensions: []
                          },
                          init: {
                            type: "DECIMAL_LITERAL",
                            value: "0"
                          }
                        }
                      ]
                    },
                    followedEmptyLine: false,
                    comments: [
                      {
                        ast_type: "comment",
                        leading: false,
                        trailing: true,
                        value: "// GHI"
                      }
                    ]
                  },
                  followedEmptyLine: false
                }
              ]
            },
            extends: undefined,
            implements: undefined
          }
        }
      ]
    });
  });

  it("comlex line comment", () => {
    expect(
      Parser.parse("// ABC\nclass A {\n// DEF\nint i = 0; // GHI\n}", parser =>
        parser.compilationUnit()
      )
    ).toEqual({
      type: "COMPILATION_UNIT",
      imports: [],
      package: undefined,
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],

          declaration: {
            type: "CLASS_DECLARATION",
            name: { type: "IDENTIFIER", value: "A" },
            typeParameters: undefined,
            body: {
              type: "CLASS_BODY",
              declarations: [
                {
                  type: "CLASS_BODY_MEMBER_DECLARATION",
                  modifiers: [],
                  declaration: {
                    type: "FIELD_DECLARATION",
                    typeType: {
                      type: "PRIMITIVE_TYPE",
                      value: "int",
                      comments: [
                        {
                          ast_type: "comment",
                          leading: true,
                          trailing: false,
                          value: "// DEF"
                        }
                      ]
                    },
                    variableDeclarators: {
                      type: "VARIABLE_DECLARATORS",
                      list: [
                        {
                          type: "VARIABLE_DECLARATOR",
                          id: {
                            type: "VARIABLE_DECLARATOR_ID",
                            id: {
                              type: "IDENTIFIER",
                              value: "i"
                            },
                            dimensions: []
                          },
                          init: {
                            type: "DECIMAL_LITERAL",
                            value: "0"
                          }
                        }
                      ]
                    },
                    followedEmptyLine: false,
                    comments: [
                      {
                        ast_type: "comment",
                        leading: false,
                        trailing: true,
                        value: "// GHI"
                      }
                    ]
                  },
                  followedEmptyLine: false
                }
              ]
            },
            extends: undefined,
            implements: undefined,
            comments: [
              {
                ast_type: "comment",
                leading: true,
                trailing: false,
                value: "// ABC"
              }
            ]
          }
        }
      ]
    });
  });

  it("line comments standalone", () => {
    expect(
      Parser.parse("class A {\n// Abc\n\n// XYZ\n\n// Something\n}", parser =>
        parser.compilationUnit()
      )
    ).toEqual({
      type: "COMPILATION_UNIT",
      imports: [],
      package: undefined,
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],

          declaration: {
            type: "CLASS_DECLARATION",
            name: { type: "IDENTIFIER", value: "A" },
            typeParameters: undefined,
            body: {
              type: "CLASS_BODY",
              declarations: [
                {
                  type: "LINE_COMMENT_STANDALONE",
                  value: "// Abc"
                },
                {
                  type: "LINE_COMMENT_STANDALONE",
                  value: "// XYZ"
                },
                {
                  type: "LINE_COMMENT_STANDALONE",
                  value: "// Something"
                }
              ]
            },
            extends: undefined,
            implements: undefined
          }
        }
      ]
    });
  });

  it("line comments empty", () => {
    expect(
      Parser.parse("class A {\n//         \n}", parser =>
        parser.compilationUnit()
      )
    ).toEqual({
      type: "COMPILATION_UNIT",
      imports: [],
      package: undefined,
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],

          declaration: {
            type: "CLASS_DECLARATION",
            name: { type: "IDENTIFIER", value: "A" },
            typeParameters: undefined,
            body: {
              type: "CLASS_BODY",
              declarations: []
            },
            extends: undefined,
            implements: undefined
          }
        }
      ]
    });
  });

  it("breaks, but why?", () => {
    expect(
      Parser.parse("package abc;\n\n// ABC\nclass A {}", parser =>
        parser.compilationUnit()
      )
    ).toEqual({
      type: "COMPILATION_UNIT",
      imports: [],
      package: {
        type: "PACKAGE_DECLARATION",
        name: {
          type: "QUALIFIED_NAME",
          name: [
            {
              type: "IDENTIFIER",
              value: "abc"
            }
          ]
        }
      },
      types: [
        {
          type: "TYPE_DECLARATION",
          modifiers: [],

          declaration: {
            type: "CLASS_DECLARATION",
            name: { type: "IDENTIFIER", value: "A" },
            typeParameters: undefined,
            body: {
              type: "CLASS_BODY",
              declarations: []
            },
            extends: undefined,
            implements: undefined,
            comments: [
              {
                ast_type: "comment",
                leading: true,
                trailing: false,
                value: "// ABC"
              }
            ]
          }
        }
      ]
    });
  });

  // it("javadoc comment", () => {
  //   expect(
  //     Parser.parse("/**\n *\n */", parser => parser.compilationUnit())
  //   ).toEqual({
  //     type: "COMPILATION_UNIT",
  //     package: undefined,
  //     imports: [],
  //     types: []
  //   });
  // });

  // it("traditional comment", () => {
  //   expect(
  //     Parser.parse("/* comment \n\r */", parser => parser.compilationUnit())
  //   ).toEqual({
  //     type: "COMPILATION_UNIT",
  //     package: undefined,
  //     imports: [],
  //     types: []
  //   });
  // });
});
