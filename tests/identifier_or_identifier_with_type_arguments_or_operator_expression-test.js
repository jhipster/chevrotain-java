"use strict";
const Parser = require("../src/index");

describe("identifierOrIdentifierWithTypeArgumentsOrOperatorExpression", () => {
  it("identifier", () => {
    expect(
      Parser.parse("i", parser =>
        parser.identifierOrIdentifierWithTypeArgumentsOrOperatorExpression()
      )
    ).toEqual({
      type: "IDENTIFIER",
      value: "i"
    });
  });

  it("operatorExpression Less", () => {
    expect(
      Parser.parse("i < array.length", parser =>
        parser.identifierOrIdentifierWithTypeArgumentsOrOperatorExpression()
      )
    ).toEqual({
      type: "OPERATOR_EXPRESSION",
      left: {
        type: "IDENTIFIER",
        value: "i"
      },
      operator: "<",
      right: {
        type: "TYPE_ARGUMENT",
        argument: {
          type: "CLASS_OR_INTERFACE_TYPE",
          elements: [
            {
              type: "IDENTIFIER",
              value: "array"
            },
            {
              type: "IDENTIFIER",
              value: "length"
            }
          ]
        },
        extends: undefined,
        super: undefined
      }
    });
  });

  it("operatorExpression Less with typeArgument as method", () => {
    expect(
      Parser.parse("i < size()", parser =>
        parser.identifierOrIdentifierWithTypeArgumentsOrOperatorExpression()
      )
    ).toEqual({
      type: "OPERATOR_EXPRESSION",
      left: {
        type: "IDENTIFIER",
        value: "i"
      },
      operator: "<",
      right: {
        type: "METHOD_INVOCATION",
        name: {
          type: "IDENTIFIER",
          value: "size"
        },
        parameters: undefined,
        dimensions: []
      }
    });
  });

  it("operatorExpression Less with typeArgument as method and dimensions", () => {
    expect(
      Parser.parse("i < size()[0]", parser =>
        parser.identifierOrIdentifierWithTypeArgumentsOrOperatorExpression()
      )
    ).toEqual({
      type: "OPERATOR_EXPRESSION",
      left: {
        type: "IDENTIFIER",
        value: "i"
      },
      operator: "<",
      right: {
        type: "METHOD_INVOCATION",
        name: {
          type: "IDENTIFIER",
          value: "size"
        },
        parameters: undefined,
        dimensions: [
          {
            type: "DIMENSION",
            expression: {
              type: "DECIMAL_LITERAL",
              value: "0"
            }
          }
        ]
      }
    });
  });

  it("operatorExpression Less with typeArgument as method and parameters", () => {
    expect(
      Parser.parse("i < size(this)", parser =>
        parser.identifierOrIdentifierWithTypeArgumentsOrOperatorExpression()
      )
    ).toEqual({
      type: "OPERATOR_EXPRESSION",
      left: {
        type: "IDENTIFIER",
        value: "i"
      },
      operator: "<",
      right: {
        type: "METHOD_INVOCATION",
        name: {
          type: "IDENTIFIER",
          value: "size"
        },
        parameters: {
          list: [
            {
              type: "THIS"
            }
          ],
          type: "EXPRESSION_LIST"
        },
        dimensions: []
      }
    });
  });

  it("operatorExpression Less with qualifiedNameExpression as method", () => {
    expect(
      Parser.parse("i < list.size()", parser =>
        parser.identifierOrIdentifierWithTypeArgumentsOrOperatorExpression()
      )
    ).toEqual({
      type: "OPERATOR_EXPRESSION",
      left: {
        type: "IDENTIFIER",
        value: "i"
      },
      operator: "<",
      right: {
        type: "QUALIFIED_EXPRESSION",
        expression: {
          type: "IDENTIFIER",
          value: "list"
        },
        rest: {
          type: "METHOD_INVOCATION",
          name: {
            type: "IDENTIFIER",
            value: "size"
          },
          parameters: undefined,
          dimensions: []
        }
      }
    });
  });

  it("operatorExpression Less with number", () => {
    expect(
      Parser.parse("i < 3", parser =>
        parser.identifierOrIdentifierWithTypeArgumentsOrOperatorExpression()
      )
    ).toEqual({
      type: "OPERATOR_EXPRESSION",
      left: {
        type: "IDENTIFIER",
        value: "i"
      },
      operator: "<",
      right: {
        type: "DECIMAL_LITERAL",
        value: "3"
      }
    });
  });
});
