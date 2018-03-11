"use strict";
const Parser = require("../src/index");

describe("classOrInterfaceModifier", () => {
  it("public", () => {
    expect(
      Parser.parse("public", parser => parser.classOrInterfaceModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "public"
    });
  });

  it("protected", () => {
    expect(
      Parser.parse("protected", parser => parser.classOrInterfaceModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "protected"
    });
  });

  it("private", () => {
    expect(
      Parser.parse("private", parser => parser.classOrInterfaceModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "private"
    });
  });

  it("static", () => {
    expect(
      Parser.parse("static", parser => parser.classOrInterfaceModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "static"
    });
  });

  it("abstract", () => {
    expect(
      Parser.parse("abstract", parser => parser.classOrInterfaceModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "abstract"
    });
  });

  it("final", () => {
    expect(
      Parser.parse("final", parser => parser.classOrInterfaceModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "final"
    });
  });

  it("strictfp", () => {
    expect(
      Parser.parse("strictfp", parser => parser.classOrInterfaceModifier())
    ).toEqual({
      type: "MODIFIER",
      value: "strictfp"
    });
  });

  it("annotation", () => {
    expect(
      Parser.parse("@Bean", parser => parser.classOrInterfaceModifier())
    ).toEqual({
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
      hasBraces: false
    });
  });

  it("annotation with braces", () => {
    expect(
      Parser.parse("@Bean()", parser => parser.classOrInterfaceModifier())
    ).toEqual({
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
      hasBraces: true,
      values: undefined
    });
  });

  it("annotation with element value (annotation)", () => {
    expect(
      Parser.parse("@Bean(@Something)", parser =>
        parser.classOrInterfaceModifier()
      )
    ).toEqual({
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
      hasBraces: true,
      values: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Something"
              }
            ]
          },
          hasBraces: false,
          value: undefined
        }
      ]
    });
  });

  it("annotation with element value (elementValueArrayInitializer)", () => {
    expect(
      Parser.parse("@Bean({@Something})", parser =>
        parser.classOrInterfaceModifier()
      )
    ).toEqual({
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
      hasBraces: true,
      values: [
        {
          type: "ELEMENT_VALUE_ARRAY_INITIALIZER",
          values: [
            {
              type: "ANNOTATION",
              name: {
                type: "QUALIFIED_NAME",
                name: [
                  {
                    type: "IDENTIFIER",
                    value: "Something"
                  }
                ]
              },
              hasBraces: false,
              value: undefined
            }
          ]
        }
      ]
    });
  });

  it("annotation with element value pairs", () => {
    expect(
      Parser.parse("@Bean(key=@Value)", parser =>
        parser.classOrInterfaceModifier()
      )
    ).toEqual({
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
      hasBraces: true,
      values: [
        {
          type: "ELEMENT_VALUE_PAIR",
          key: {
            type: "IDENTIFIER",
            value: "key"
          },
          value: {
            type: "ANNOTATION",
            name: {
              type: "QUALIFIED_NAME",
              name: [
                {
                  type: "IDENTIFIER",
                  value: "Value"
                }
              ]
            },
            hasBraces: false,
            values: undefined
          }
        }
      ]
    });
  });
});
