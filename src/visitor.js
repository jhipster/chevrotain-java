"use strict";
const JavaParser = require("./parser");

const parser = new JavaParser([]);
const BaseSQLVisitor = parser.getBaseCstVisitorConstructor();

const MismatchedTokenException = require("chevrotain").exceptions
  .MismatchedTokenException;

class SQLToAstVisitor extends BaseSQLVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  compilationUnit(ctx) {
    const pkg = this.visit(ctx.packageDeclaration);
    const imports = ctx.importDeclaration.map(importDeclaration =>
      this.visit(importDeclaration)
    );
    const types = ctx.typeDeclaration.map(typeDeclaration =>
      this.visit(typeDeclaration)
    );

    return {
      type: "COMPILATION_UNIT",
      package: pkg,
      imports: imports,
      types: types
    };
  }

  packageDeclaration(ctx) {
    const name = this.visit(ctx.qualifiedName);

    return {
      type: "PACKAGE_DECLARATION",
      name: name
    };
  }

  importDeclaration(ctx) {
    const isStatic = ctx.Static.length > 0;
    const name = this.visit(ctx.qualifiedName);
    const star = ctx.Star.map(starToken => starToken.image);
    // If import has a star at the end,
    // Add it to the name list
    if (star.length > 0) {
      name.name.push({
        type: "IDENTIFIER",
        value: "*"
      });
    }

    return {
      type: "IMPORT_DECLARATION",
      static: isStatic,
      name: name
    };
  }

  typeDeclaration(ctx) {
    const modifiers = ctx.classOrInterfaceModifier.map(modifier =>
      this.visit(modifier)
    );
    let declaration = undefined;
    if (ctx.classDeclaration.length > 0) {
      declaration = this.visit(ctx.classDeclaration);
    } else if (ctx.enumDeclaration.length > 0) {
      declaration = this.visit(ctx.enumDeclaration);
    } else if (ctx.interfaceDeclaration.length > 0) {
      declaration = this.visit(ctx.interfaceDeclaration);
    } else if (ctx.annotationTypeDeclaration.length > 0) {
      declaration = this.visit(ctx.annotationTypeDeclaration);
    }

    return {
      type: "TYPE_DECLARATION",
      modifiers: modifiers,
      declaration: declaration
    };
  }

  modifier(ctx) {
    if (ctx.classOrInterfaceModifier.length > 0) {
      return this.visit(ctx.classOrInterfaceModifier);
    }

    let value = "";
    if (ctx.Native.length > 0) {
      value = "native";
    } else if (ctx.Synchronized.length > 0) {
      value = "synchronized";
    } else if (ctx.Transient.length > 0) {
      value = "transient";
    } else if (ctx.Volatile.length > 0) {
      value = "volatile";
    }

    return {
      type: "MODIFIER",
      value: value
    };
  }

  classOrInterfaceModifier(ctx) {
    if (ctx.annotation.length > 0) {
      return this.visit(ctx.annotation);
    }

    let value = "";
    if (ctx.Public.length > 0) {
      value = "public";
    } else if (ctx.Protected.length > 0) {
      value = "protected";
    } else if (ctx.Private.length > 0) {
      value = "private";
    } else if (ctx.Static.length > 0) {
      value = "static";
    } else if (ctx.Abstract.length > 0) {
      value = "abstract";
    } else if (ctx.Final.length > 0) {
      value = "final";
    } else if (ctx.Strictfp.length > 0) {
      value = "strictfp";
    }

    return {
      type: "MODIFIER",
      value: value
    };
  }

  variableModifier(ctx) {
    if (ctx.annotation.length > 0) {
      return this.visit(ctx.annotation);
    }

    let value = "";
    if (ctx.Final.length > 0) {
      value = "final";
    }

    return {
      type: "MODIFIER",
      value: value
    };
  }

  annotation(ctx) {
    const name = this.visit(ctx.qualifiedName);
    const hasBraces = ctx.LBrace.length > 0;
    let value = undefined;
    if (hasBraces) {
      if (ctx.elementValue.length > 0) {
        value = ctx.elementValue.map(elementValue => this.visit(elementValue));
        if (value.length === 1) {
          value = value[0];
        }
      }
    }

    return {
      type: "ANNOTATION",
      name: name,
      hasBraces: hasBraces,
      value: value
    };
  }

  elementValuePairs(ctx) {
    const pairs = ctx.elementValuePair.map(elementValuePair =>
      this.visit(elementValuePair)
    );

    return {
      type: "ELEMENT_VALUE_PAIRS",
      pairs: pairs
    };
  }

  elementValuePair(ctx) {
    const key = this.identifier(ctx.Identifier[0]);
    const value = this.visit(ctx.elementValue);

    return {
      type: "ELEMENT_VALUE_PAIR",
      key: key,
      value: value
    };
  }

  elementValue(ctx) {
    if (ctx.expression.length > 0) {
      return this.visit(ctx.expression);
    }

    if (ctx.elementValueArrayInitializer.length > 0) {
      return this.visit(ctx.elementValueArrayInitializer);
    }
  }

  elementValueArrayInitializer(ctx) {
    const elementValues = ctx.elementValue.map(elementValue =>
      this.visit(elementValue)
    );
    return {
      type: "ELEMENT_VALUE_ARRAY_INITIALIZER",
      values: elementValues
    };
  }

  classDeclaration(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const body = this.visit(ctx.classBody);
    const typeParameters = this.visit(ctx.typeParameters);
    const ext = this.visit(ctx.typeType);
    const impl = this.visit(ctx.typeList);

    return {
      type: "CLASS_DECLARATION",
      name: name,
      typeParameters: typeParameters,
      extends: ext,
      implements: impl,
      body: body
    };
  }

  typeParameters(ctx) {
    const parameters = ctx.typeParameter.map(typeParameter =>
      this.visit(typeParameter)
    );

    return {
      type: "TYPE_PARAMETERS",
      parameters: parameters
    };
  }

  typeParameter(ctx) {
    const annotations = ctx.annotation.map(annotation =>
      this.visit(annotation)
    );
    const name = this.identifier(ctx.Identifier[0]);
    const typeBound = this.visit(ctx.typeBound);

    return {
      type: "TYPE_PARAMETER",
      annotations: annotations,
      name: name,
      typeBound: typeBound
    };
  }

  typeBound(ctx) {
    const bounds = ctx.typeType.map(typeType => this.visit(typeType));

    return {
      type: "TYPE_BOUND",
      bounds: bounds
    };
  }

  classBody(ctx) {
    const declarations = ctx.classBodyDeclaration.map(declaration =>
      this.visit(declaration)
    );

    return {
      type: "CLASS_BODY",
      declarations: declarations
    };
  }

  classBodyDeclaration(ctx) {
    if (ctx.block.length > 0) {
      const isStatic = ctx.Static.length > 0;
      const block = this.visit(ctx.block);

      return {
        type: "CLASS_BODY_BLOCK",
        static: isStatic,
        block: block
      };
    }

    if (ctx.memberDeclaration.length > 0) {
      const modifiers = ctx.modifier.map(modifier => this.visit(modifier));
      const declaration = this.visit(ctx.memberDeclaration);

      return {
        type: "CLASS_BODY_MEMBER_DECLARATION",
        modifiers: modifiers,
        declaration: declaration
      };
    }
  }

  memberDeclaration(ctx) {
    if (ctx.interfaceDeclaration.length > 0) {
      return this.visit(ctx.interfaceDeclaration);
    }
    if (ctx.annotationTypeDeclaration.length > 0) {
      return this.visit(ctx.annotationTypeDeclaration);
    }
    if (ctx.classDeclaration.length > 0) {
      return this.visit(ctx.classDeclaration);
    }
    if (ctx.enumDeclaration.length > 0) {
      return this.visit(ctx.enumDeclaration);
    }
    if (
      ctx.genericMethodDeclarationOrGenericConstructorDeclaration.length > 0
    ) {
      return this.visit(
        ctx.genericMethodDeclarationOrGenericConstructorDeclaration
      );
    }
    if (
      ctx.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration.length > 0
    ) {
      return this.visit(
        ctx.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration
      );
    }
  }

  fieldDeclarationOrMethodDeclarationOrConstructorDeclaration(ctx) {
    if (ctx.Identifier.length > 0) {
      if (ctx.Identifier[0].isConstructorDeclaration) {
        // constructorDeclaration
        const name = this.identifier(ctx.Identifier[0]);
        const parameters = this.visit(ctx.formalParameters);
        const throws = this.visit(ctx.qualifiedNameList);
        const body = this.visit(ctx.methodBody);

        return {
          type: "CONSTRUCTOR_DECLARATION",
          name: name,
          parameters: parameters,
          throws: throws,
          body: body
        };
      }

      // methodDeclaration
      // fieldDeclaration

      // typeType
      let typeType = undefined;
      if (ctx.Void.length > 0) {
        typeType = {
          type: "VOID"
        };
      } else {
        const annotations = ctx.annotation.map(annotation =>
          this.visit(annotation)
        );
        let cntSquares = 0;
        ctx.LSquare.map(lSquare => {
          if (lSquare.isTypeType) {
            cntSquares++;
          }
        });

        let value = undefined;
        if (ctx.primitiveType.length > 0) {
          value = this.visit(ctx.primitiveType);
          // if empty typeType return child
          if (annotations.length === 0 && cntSquares === 0) {
            typeType = value;
          }
        } else if (ctx.Identifier.length > 0) {
          const name = this.identifier(ctx.Identifier[0]);
          const typeArguments = this.visit(ctx.typeArguments);

          if (!typeArguments && ctx.classOrInterfaceTypeElement.length === 0) {
            typeType = name;
          } else {
            typeType = {
              type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
              name: name,
              typeArguments: typeArguments
            };
          }
          const elements = [typeType];

          ctx.classOrInterfaceTypeElement.map(classOrInterfaceTypeElement =>
            elements.push(this.visit(classOrInterfaceTypeElement))
          );

          if (elements.length === 1) {
            typeType = elements[0];
          } else {
            typeType = {
              type: "CLASS_OR_INTERFACE_TYPE",
              elements: elements
            };
          }

          if (annotations.length !== 0 || cntSquares !== 0) {
            typeType = {
              type: "TYPE_TYPE",
              modifiers: annotations,
              value: typeType,
              cntSquares: cntSquares
            };
          }
        }
      }

      if (
        ctx.primitiveType.length > 0 ||
        ctx.Void.length > 0 ||
        ctx.Identifier[0].isMethodDeclaration
      ) {
        // methodDeclaration
        const name = this.identifier(
          ctx.Identifier[ctx.Identifier[0].isMethodDeclaration ? 1 : 0]
        );
        const parameters = this.visit(ctx.formalParameters);
        let cntSquares = 0;
        ctx.LSquare.map(lSquare => {
          if (!lSquare.isTypeType) {
            cntSquares++;
          }
        });
        const throws = this.visit(ctx.qualifiedNameList);
        const body = this.visit(ctx.methodBody);

        return {
          type: "METHOD_DECLARATION",
          typeType: typeType,
          name: name,
          parameters: parameters,
          cntSquares: cntSquares,
          throws: throws,
          body: body
        };
      }

      if (ctx.Identifier[0].isFieldDeclaration) {
        const id = this.identifier(ctx.Identifier[1]);
        const cntSquares = ctx.LSquare.length;
        const variableDeclaratorId = {
          type: "VARIABLE_DECLARATOR_ID",
          id: id,
          cntSquares: cntSquares
        };

        const init = this.visit(ctx.variableInitializer);
        const variableDeclarator = {
          type: "VARIABLE_DECLARATOR",
          id: variableDeclaratorId,
          init: init
        };

        const declarators = [variableDeclarator];
        ctx.variableDeclarator.map(variableDeclarator =>
          declarators.push(this.visit(variableDeclarator))
        );

        const variableDeclarators = {
          type: "VARIABLE_DECLARATORS",
          list: declarators
        };

        return {
          type: "FIELD_DECLARATION",
          typeType: typeType,
          variableDeclarators: variableDeclarators
        };
      }
    }
  }

  methodDeclaration(ctx) {
    const typeType = this.visit(ctx.typeTypeOrVoid);
    const name = this.identifier(ctx.Identifier[0]);
    const parameters = this.visit(ctx.formalParameters);
    const cntSquares = ctx.LSquare.length;
    const throws = this.visit(ctx.qualifiedNameList);
    const body = this.visit(ctx.methodBody);

    return {
      type: "METHOD_DECLARATION",
      typeType: typeType,
      name: name,
      parameters: parameters,
      cntSquares: cntSquares,
      throws: throws,
      body: body
    };
  }

  constructorDeclaration(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const parameters = this.visit(ctx.formalParameters);
    const throws = this.visit(ctx.qualifiedNameList);
    const body = this.visit(ctx.methodBody);

    return {
      type: "CONSTRUCTOR_DECLARATION",
      name: name,
      parameters: parameters,
      throws: throws,
      body: body
    };
  }

  genericMethodDeclarationOrGenericConstructorDeclaration(ctx) {
    const typeParameters = this.visit(ctx.typeParameters);

    if (ctx.methodDeclaration.length > 0) {
      const methodDeclaration = this.visit(ctx.methodDeclaration);

      return {
        type: "GENERIC_METHOD_DECLARATION",
        typeParameters: typeParameters,
        methodDeclaration: methodDeclaration
      };
    }

    if (ctx.constructorDeclaration.length > 0) {
      const constructorDeclaration = this.visit(ctx.constructorDeclaration);

      return {
        type: "GENERIC_CONSTRUCTOR_DECLARATION",
        typeParameters: typeParameters,
        constructorDeclaration: constructorDeclaration
      };
    }
  }

  fieldDeclaration(ctx) {
    const typeType = this.visit(ctx.typeType);
    const variableDeclarators = this.visit(ctx.variableDeclarators);

    return {
      type: "FIELD_DECLARATION",
      typeType: typeType,
      variableDeclarators: variableDeclarators
    };
  }

  methodBody(ctx) {
    if (ctx.block.length > 0) {
      return this.visit(ctx.block);
    }
    if (ctx.SemiColon.length > 0) {
      return undefined;
    }
  }

  enumDeclaration(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const impl = this.visit(ctx.typeList);
    const enumConstants = this.visit(ctx.enumConstants);
    const body = this.visit(ctx.enumBodyDeclarations);

    return {
      type: "ENUM_DECLARATION",
      name: name,
      implements: impl,
      enumConstants: enumConstants,
      body: body
    };
  }

  enumConstants(ctx) {
    const list = ctx.enumConstant.map(enumConstant => this.visit(enumConstant));

    return {
      type: "ENUM_CONSTANTS",
      list: list
    };
  }

  enumConstant(ctx) {
    const modifiers = ctx.annotation.map(annotation => this.visit(annotation));
    const name = this.identifier(ctx.Identifier[0]);
    const args = this.visit(ctx.arguments);
    const body = this.visit(ctx.classBody);

    return {
      type: "ENUM_CONSTANT",
      modifiers: modifiers,
      name: name,
      arguments: args,
      body: body
    };
  }

  enumBodyDeclarations(ctx) {
    const declarations = ctx.classBodyDeclaration.map(classBodyDeclaration =>
      this.visit(classBodyDeclaration)
    );

    return {
      type: "ENUM_BODY_DECLARATIONS",
      declarations: declarations
    };
  }

  interfaceDeclaration(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const typeParameters = this.visit(ctx.typeParameters);
    const typeList = this.visit(ctx.typeList);
    const body = this.visit(ctx.interfaceBody);

    return {
      type: "INTERFACE_DECLARATION",
      name: name,
      typeParameters: typeParameters,
      extends: typeList,
      body: body
    };
  }

  interfaceBody(ctx) {
    const declarations = ctx.interfaceBodyDeclaration.map(
      interfaceBodyDeclaration => this.visit(interfaceBodyDeclaration)
    );

    return {
      type: "INTERFACE_BODY",
      declarations: declarations
    };
  }

  interfaceBodyDeclaration(ctx) {
    const modifiers = ctx.modifier.map(modifier => this.visit(modifier));
    const declaration = this.visit(ctx.interfaceMemberDeclaration);

    return {
      type: "INTERFACE_BODY_DECLARATION",
      modifiers: modifiers,
      declaration: declaration
    };
  }

  interfaceMemberDeclaration(ctx) {
    if (ctx.constantDeclarationOrInterfaceMethodDeclaration.length > 0) {
      return this.visit(ctx.constantDeclarationOrInterfaceMethodDeclaration);
    } else if (ctx.interfaceDeclaration.length > 0) {
      return this.visit(ctx.interfaceDeclaration);
    } else if (ctx.classDeclaration.length > 0) {
      return this.visit(ctx.classDeclaration);
    } else if (ctx.enumDeclaration.length > 0) {
      return this.visit(ctx.enumDeclaration);
    }
  }

  constantDeclarationOrInterfaceMethodDeclaration(ctx) {
    if (ctx.SemiColon.length > 0) {
      // constantDeclaration
      const typeType = this.visit(ctx.typeType);
      const declarators = ctx.constantDeclarator.map(declarator =>
        this.visit(declarator)
      );

      return {
        type: "CONSTANT_DECLARATION",
        typeType: typeType,
        declarators: declarators
      };
    }

    if (ctx.methodBody.length > 0) {
      // interfaceMethodDeclaration
      const modifiers = ctx.interfaceMethodModifier.map(modifier =>
        this.visit(modifier)
      );
      const typeParameters = this.visit(ctx.typeParameters);
      let typeType = undefined;
      if (ctx.typeType.length > 0) {
        typeType = this.visit(ctx.typeType);
      } else if (ctx.Void.length > 0) {
        typeType = {
          type: "VOID"
        };
      }
      const name = this.identifier(ctx.Identifier[0]);
      const parameters = this.visit(ctx.formalParameters);
      const cntSquares = ctx.LSquare.length;
      const throws = this.visit(ctx.qualifiedNameList);
      const body = this.visit(ctx.methodBody);

      return {
        type: "INTERFACE_METHOD_DECLARATION",
        modifiers: modifiers,
        typeParameters: typeParameters,
        typeType: typeType,
        name: name,
        parameters: parameters,
        cntSquares: cntSquares,
        throws: throws,
        body: body
      };
    }
  }

  constantDeclaration(ctx) {
    const typeType = this.visit(ctx.typeType);
    const declarators = ctx.constantDeclarator.map(declarator =>
      this.visit(declarator)
    );

    return {
      type: "CONSTANT_DECLARATION",
      typeType: typeType,
      declarators: declarators
    };
  }

  constantDeclarator(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const cntSquares = ctx.LSquare.length;
    const init = this.visit(ctx.variableInitializer);

    return {
      type: "CONSTANT_DECLARATOR",
      name: name,
      cntSquares: cntSquares,
      init: init
    };
  }

  interfaceMethodDeclaration(ctx) {
    const modifiers = ctx.interfaceMethodModifier.map(modifier =>
      this.visit(modifier)
    );
    const typeParameters = this.visit(ctx.typeParameters);
    const typeType = this.visit(ctx.typeTypeOrVoid);
    const name = this.identifier(ctx.Identifier[0]);
    const parameters = this.visit(ctx.formalParameters);
    const cntSquares = ctx.LSquare.length;
    const throws = this.visit(ctx.qualifiedNameList);
    const body = this.visit(ctx.methodBody);

    return {
      type: "INTERFACE_METHOD_DECLARATION",
      modifiers: modifiers,
      typeParameters: typeParameters,
      typeType: typeType,
      name: name,
      parameters: parameters,
      cntSquares: cntSquares,
      throws: throws,
      body: body
    };
  }

  interfaceMethodModifier(ctx) {
    if (ctx.annotation.length > 0) {
      return this.visit(ctx.annotation);
    }

    let value = "";
    if (ctx.Public.length > 0) {
      value = "public";
    } else if (ctx.Abstract.length > 0) {
      value = "abstract";
    } else if (ctx.Default.length > 0) {
      value = "default";
    } else if (ctx.Static.length > 0) {
      value = "static";
    } else if (ctx.Strictfp.length > 0) {
      value = "strictfp";
    }

    return {
      type: "MODIFIER",
      value: value
    };
  }

  variableDeclarators(ctx) {
    const list = ctx.variableDeclarator.map(variableDeclarator =>
      this.visit(variableDeclarator)
    );

    return {
      type: "VARIABLE_DECLARATORS",
      list: list
    };
  }

  variableDeclarator(ctx) {
    const id = this.visit(ctx.variableDeclaratorId);
    const init = this.visit(ctx.variableInitializer);

    return {
      type: "VARIABLE_DECLARATOR",
      id: id,
      init: init
    };
  }

  variableDeclaratorId(ctx) {
    const id = this.identifier(ctx.Identifier[0]);
    const cntSquares = ctx.LSquare.length;
    return {
      type: "VARIABLE_DECLARATOR_ID",
      id: id,
      cntSquares: cntSquares
    };
  }

  variableInitializer(ctx) {
    if (ctx.expression.length > 0) {
      return this.visit(ctx.expression);
    }

    if (ctx.arrayInitializer.length > 0) {
      return this.visit(ctx.arrayInitializer);
    }
  }

  arrayInitializer(ctx) {
    const variableInitializers = ctx.variableInitializer.map(
      variableInitializer => this.visit(variableInitializer)
    );

    return {
      type: "ARRAY_INITIALIZER",
      variableInitializers: variableInitializers
    };
  }

  annotationTypeDeclaration(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const body = this.visit(ctx.annotationTypeBody);

    return {
      type: "ANNOTATION_TYPE_DECLARATION",
      name: name,
      body: body
    };
  }

  annotationTypeBody(ctx) {
    const declarations = ctx.annotationTypeElementDeclaration.map(
      annotationTypeElementDeclaration =>
        this.visit(annotationTypeElementDeclaration)
    );

    return {
      type: "ANNOTATION_TYPE_BODY",
      declarations: declarations
    };
  }

  annotationTypeElementDeclaration(ctx) {
    const modifiers = ctx.modifier.map(modifier => this.visit(modifier));
    const declaration = this.visit(ctx.annotationTypeElementRest);

    return {
      type: "ANNOTATION_TYPE_ELEMENT_DECLARATION",
      modifiers: modifiers,
      declaration: declaration
    };
  }

  annotationTypeElementRest(ctx) {
    if (ctx.classDeclaration.length > 0) {
      return this.visit(ctx.classDeclaration);
    } else if (ctx.enumDeclaration.length > 0) {
      return this.visit(ctx.enumDeclaration);
    } else if (ctx.interfaceDeclaration.length > 0) {
      return this.visit(ctx.interfaceDeclaration);
    } else if (ctx.annotationTypeDeclaration.length > 0) {
      return this.visit(ctx.annotationTypeDeclaration);
    }

    const typeType = this.visit(ctx.typeType);
    const name = this.visit(ctx.annotationMethodRestOrConstantRest);

    return {
      type: "ANNOTATION_TYPE_ELEMENT_REST",
      typeType: typeType,
      name: name
    };
  }

  annotationMethodRestOrConstantRest(ctx) {
    if (ctx.annotationMethodRest.length > 0) {
      return this.visit(ctx.annotationMethodRest);
    }

    if (ctx.annotationConstantRest.length > 0) {
      return this.visit(ctx.annotationConstantRest);
    }
  }

  annotationMethodRest(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const defaultValue = this.visit(ctx.defaultValue);

    return {
      type: "ANNOTATION_METHOD_REST",
      name: name,
      defaultValue: defaultValue
    };
  }

  annotationConstantRest(ctx) {
    if (ctx.variableDeclarators.length > 0) {
      return this.visit(ctx.variableDeclarators);
    }
  }

  defaultValue(ctx) {
    const value = this.visit(ctx.elementValue);

    return {
      type: "DEFAULT_VALUE",
      value: value
    };
  }

  typeList(ctx) {
    const list = ctx.typeType.map(typeType => this.visit(typeType));

    return {
      type: "TYPE_LIST",
      list: list
    };
  }

  typeType(ctx) {
    const annotations = ctx.annotation.map(annotation =>
      this.visit(annotation)
    );
    const cntSquares = ctx.LSquare.length;

    let value = undefined;
    if (ctx.primitiveType.length > 0) {
      value = this.visit(ctx.primitiveType);
      // if empty typeType return child
      if (annotations.length === 0 && cntSquares === 0) {
        return value;
      }
    } else if (ctx.classOrInterfaceType.length > 0) {
      value = this.visit(ctx.classOrInterfaceType);
      // if empty typeType return child
      if (annotations.length === 0 && cntSquares === 0) {
        return value;
      }
    }

    if (!value) {
      return annotations[0];
    }

    return {
      type: "TYPE_TYPE",
      modifiers: annotations,
      value: value,
      cntSquares: cntSquares
    };
  }

  typeTypeOrVoid(ctx) {
    if (ctx.typeType.length > 0) {
      return this.visit(ctx.typeType);
    } else if (ctx.Void.length > 0) {
      return { type: "VOID" };
    }
  }

  classOrInterfaceType(ctx) {
    const elements = ctx.classOrInterfaceTypeElement.map(
      classOrInterfaceTypeElement => this.visit(classOrInterfaceTypeElement)
    );

    if (elements.length === 1) {
      return elements[0];
    }

    return {
      type: "CLASS_OR_INTERFACE_TYPE",
      elements: elements
    };
  }

  classOrInterfaceTypeElement(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const typeArguments = this.visit(ctx.typeArguments);

    if (!typeArguments) {
      return name;
    }

    return {
      type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
      name: name,
      typeArguments: typeArguments
    };
  }

  typeArguments(ctx) {
    const args = ctx.typeArgument.map(typeArgument => this.visit(typeArgument));

    return {
      type: "TYPE_ARGUMENTS",
      arguments: args
    };
  }

  typeArgument(ctx) {
    const isQuestionmark = ctx.Questionmark.length > 0;

    let argument = undefined;
    if (isQuestionmark) {
      argument = { type: "QUESTIONMARK" };
    } else {
      argument = this.visit(ctx.typeType[0]);
    }

    let spr = undefined;
    let ext = undefined;
    if (ctx.Super.length > 0) {
      if (isQuestionmark) {
        spr = this.visit(ctx.typeType[0]);
      } else {
        spr = this.visit(ctx.typeType[1]);
      }
    } else if (ctx.Extends.length > 0) {
      if (isQuestionmark) {
        ext = this.visit(ctx.typeType[0]);
      } else {
        ext = this.visit(ctx.typeType[1]);
      }
    }

    return {
      type: "TYPE_ARGUMENT",
      argument: argument,
      super: spr,
      extends: ext
    };
  }

  qualifiedNameList(ctx) {
    const list = ctx.qualifiedName.map(qualifiedName =>
      this.visit(qualifiedName)
    );

    return {
      type: "QUALIFIED_NAME_LIST",
      list: list
    };
  }

  identifiers(ctx) {
    const identifiers = this.visit(ctx.identifierList);

    return {
      type: "IDENTIFIERS",
      identifiers: identifiers
    };
  }

  identifierList(ctx) {
    const identifiers = ctx.Identifier.map(
      identifierToken => identifierToken.image
    );

    return {
      type: "IDENTIFIER_LIST",
      identifiers: identifiers
    };
  }

  formalParameters(ctx) {
    const parameters = this.visit(ctx.formalParameterList);

    return {
      type: "FORMAL_PARAMETERS",
      parameters: parameters ? parameters : []
    };
  }

  formalParameterList(ctx) {
    const formalParameters = ctx.formalParameter.map(formalParameter =>
      this.visit(formalParameter)
    );

    for (let i = 0; i < formalParameters.length; i++) {
      if (formalParameters[i].dotDotDot && i + 1 < formalParameters.length) {
        throw new MismatchedTokenException(
          'Only last parameter is allowed with "..."',
          undefined
        );
      }
    }

    return formalParameters;
  }

  formalParameter(ctx) {
    const modifiers = ctx.variableModifier.map(modifier =>
      this.visit(modifier)
    );
    const typeType = this.visit(ctx.typeType);
    const id = this.visit(ctx.variableDeclaratorId);
    const isDotDotDot = ctx.DotDotDot.length > 0;

    return {
      type: "FORMAL_PARAMETER",
      modifiers: modifiers,
      typeType: typeType,
      id: id,
      dotDotDot: isDotDotDot
    };
  }

  block(ctx) {
    const blockStatements = ctx.blockStatement.map(blockStatement =>
      this.visit(blockStatement)
    );

    return {
      type: "BLOCK",
      statements: blockStatements
    };
  }

  blockStatement(ctx) {
    if (ctx.expression.length > 0) {
      const expression = this.visit(ctx.expression);

      if (expression.type === "PRIMITIVE_TYPE") {
        // if expression is only a primitiveType nothing else is allowed with it
        if (ctx.Colon.length > 0) {
          throw new MismatchedTokenException(
            "Primitive type with colon found",
            undefined
          );
        }
        if (ctx.typeArguments.length > 0 || ctx.Dot.length > 0) {
          throw new MismatchedTokenException(
            "Primitive type with type arguments or dot found",
            undefined
          );
        }
      }

      if (expression.type !== "IDENTIFIER") {
        // if expression is only a primitiveType nothing else is allowed with it
        if (ctx.Colon.length > 0) {
          throw new MismatchedTokenException(
            "Only identifier is allowed with colon",
            undefined
          );
        }
        if (ctx.typeArguments.length > 0 || ctx.Dot.length > 0) {
          throw new MismatchedTokenException(
            "Only identifier is allowed with type arguments or dot",
            undefined
          );
        }
      }

      // identifier statement
      if (expression.type === "IDENTIFIER" || ctx.Colon.length > 0) {
        if (ctx.classOrInterfaceModifier.length > 0) {
          throw new MismatchedTokenException(
            "Identifier statement is not allowed to have annotations or modifiers.",
            undefined
          );
        }
        if (ctx.LSquare.length > 0 || ctx.variableDeclarators.length > 0) {
          throw new MismatchedTokenException(
            "Identifier statement is not allowed to have squares or variable declarators",
            undefined
          );
        }
        const statement = this.visit(ctx.statement);

        return {
          type: "IDENTIFIER_STATEMENT",
          identifier: expression,
          statement: statement
        };
      }

      if (
        expression.type === "IDENTIFIER" ||
        expression.type === "PRIMITIVE_TYPE"
      ) {
        // localVariableDeclaration
        const modifiers = ctx.classOrInterfaceModifier.map(modifierRule => {
          const modifier = this.visit(modifierRule);
          if (
            modifier.type === "MODIFIER" &&
            (modifier.value === "public" ||
              modifier.value === "protected" ||
              modifier.value === "private" ||
              modifier.value === "static" ||
              modifier.value === "abstract" ||
              modifier.value === "strictfp")
          ) {
            throw new MismatchedTokenException(
              "Locale variable declaration can't have a public, protected, private, static, abstract or strictfp modifier.",
              undefined
            );
          }
          return modifier;
        });

        const declarators = this.visit(ctx.variableDeclarators);

        return {
          type: "LOCAL_VARIABLE_DECLARATION",
          modifiers: modifiers,
          typeType: expression,
          declarators: declarators
        };
      }

      if (expression.type === "IDENTIFIER" || ctx.SemiColon.length > 0) {
        // expressionStatement
        return {
          type: "EXPRESSION_STATEMENT",
          expression: expression
        };
      }
    }

    if (
      ctx.classDeclaration.length > 0 ||
      ctx.interfaceDeclaration.length > 0
    ) {
      // localTypeDeclaration
      const modifiers = ctx.classOrInterfaceModifier.map(modifier =>
        this.visit(modifier)
      );
      let declaration = undefined;
      if (ctx.classDeclaration.length > 0) {
        declaration = this.visit(ctx.classDeclaration);
      }
      if (ctx.interfaceDeclaration.length > 0) {
        declaration = this.visit(ctx.interfaceDeclaration);
      }

      return {
        type: "LOCAL_TYPE_DECLARATION",
        modifiers: modifiers,
        declaration: declaration
      };
    }

    if (ctx.statementWithStartingToken.length > 0) {
      return this.visit(ctx.statementWithStartingToken);
    }
  }

  statement(ctx) {
    if (ctx.statementWithStartingToken.length > 0) {
      return this.visit(ctx.statementWithStartingToken);
    }

    if (ctx.identifierStatement.length > 0) {
      return this.visit(ctx.identifierStatement);
    }

    if (ctx.expressionStatement.length > 0) {
      return this.visit(ctx.expressionStatement);
    }
  }

  statementWithStartingToken(ctx) {
    if (ctx.block.length > 0) {
      return this.visit(ctx.block);
    }

    if (ctx.assertStatement.length > 0) {
      return this.visit(ctx.assertStatement);
    }

    if (ctx.ifStatement.length > 0) {
      return this.visit(ctx.ifStatement);
    }

    if (ctx.whileStatement.length > 0) {
      return this.visit(ctx.whileStatement);
    }

    if (ctx.forStatement.length > 0) {
      return this.visit(ctx.forStatement);
    }

    if (ctx.doWhileStatement.length > 0) {
      return this.visit(ctx.doWhileStatement);
    }

    if (ctx.tryStatement.length > 0) {
      return this.visit(ctx.tryStatement);
    }

    if (ctx.switchStatement.length > 0) {
      return this.visit(ctx.switchStatement);
    }

    if (ctx.synchronizedStatement.length > 0) {
      return this.visit(ctx.synchronizedStatement);
    }

    if (ctx.returnStatement.length > 0) {
      return this.visit(ctx.returnStatement);
    }

    if (ctx.throwStatement.length > 0) {
      return this.visit(ctx.throwStatement);
    }

    if (ctx.breakStatement.length > 0) {
      return this.visit(ctx.breakStatement);
    }

    if (ctx.continueStatement.length > 0) {
      return this.visit(ctx.continueStatement);
    }

    if (ctx.semiColonStatement.length > 0) {
      return this.visit(ctx.semiColonStatement);
    }
  }

  assertStatement(ctx) {
    const expressions = ctx.expression.map(expression =>
      this.visit(expression)
    );

    return {
      type: "ASSERT_STATEMENT",
      expressions: expressions
    };
  }

  ifStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const body = this.visit(ctx.statement[0]);
    let elseStatement = undefined;
    if (ctx.statement.length > 1) {
      elseStatement = this.visit(ctx.statement[1]);
    }

    return {
      type: "IF_STATEMENT",
      condition: condition,
      body: body,
      else: elseStatement
    };
  }

  whileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const body = this.visit(ctx.statement);

    return {
      type: "WHILE_STATEMENT",
      condition: condition,
      body: body
    };
  }

  doWhileStatement(ctx) {
    const body = this.visit(ctx.statement);
    const condition = this.visit(ctx.expression);

    return {
      type: "DO_WHILE_STATEMENT",
      body: body,
      condition: condition
    };
  }

  tryStatement(ctx) {
    const resourceSpecification = this.visit(ctx.resourceSpecification);
    const body = this.visit(ctx.block);
    const catchClauses = ctx.catchClause.map(catchClause =>
      this.visit(catchClause)
    );
    const finallyBlock = this.visit(ctx.finallyBlock);

    return {
      type: "TRY_STATEMENT",
      resourceSpecification: resourceSpecification,
      body: body,
      catchClauses: catchClauses,
      finally: finallyBlock
    };
  }

  switchStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statementGroups = ctx.switchBlockStatementGroup.map(
      switchBlockStatementGroup => this.visit(switchBlockStatementGroup)
    );

    return {
      type: "SWITCH_STATEMENT",
      condition: condition,
      statementGroups: statementGroups
    };
  }

  synchronizedStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const body = this.visit(ctx.block);

    return {
      type: "SYNCHRONIZED_STATEMENT",
      condition: condition,
      body: body
    };
  }

  returnStatement(ctx) {
    const expression = this.visit(ctx.expression);

    return {
      type: "RETURN_STATEMENT",
      expression: expression
    };
  }

  throwStatement(ctx) {
    const expression = this.visit(ctx.expression);

    return {
      type: "THROW_STATEMENT",
      expression: expression
    };
  }

  breakStatement(ctx) {
    let identifier = undefined;
    if (ctx.Identifier.length > 0) {
      identifier = this.identifier(ctx.Identifier[0]);
    }

    return {
      type: "BREAK_STATEMENT",
      identifier: identifier
    };
  }

  continueStatement(ctx) {
    let identifier = undefined;
    if (ctx.Identifier.length > 0) {
      identifier = this.identifier(ctx.Identifier[0]);
    }

    return {
      type: "CONTINUE_STATEMENT",
      identifier: identifier
    };
  }

  semiColonStatement() {
    return {
      type: "SEMI_COLON_STATEMENT"
    };
  }

  expressionStatement(ctx) {
    const expression = this.visit(ctx.expression);

    return {
      type: "EXPRESSION_STATEMENT",
      expression: expression
    };
  }

  identifierStatement(ctx) {
    const identifier = this.identifier(ctx.Identifier[0]);
    const statement = this.visit(ctx.statement);

    return {
      type: "IDENTIFIER_STATEMENT",
      identifier: identifier,
      statement: statement
    };
  }

  catchClause(ctx) {
    const modifiers = ctx.variableModifier.map(modifier =>
      this.visit(modifier)
    );
    const catchType = this.visit(ctx.catchType);
    const id = this.identifier(ctx.Identifier[0]);
    const block = this.visit(ctx.block);

    return {
      type: "CATCH_CLAUSE",
      modifiers: modifiers,
      catchType: catchType,
      id: id,
      block: block
    };
  }

  catchType(ctx) {
    const types = ctx.qualifiedName.map(qualifiedName =>
      this.visit(qualifiedName)
    );

    return {
      type: "CATCH_TYPE",
      types: types
    };
  }

  finallyBlock(ctx) {
    const block = this.visit(ctx.block);

    return {
      type: "FINALLY_BLOCK",
      block: block
    };
  }

  resourceSpecification(ctx) {
    const resources = this.visit(ctx.resources);

    return {
      type: "RESOURCE_SPECIFICATION",
      resources: resources
    };
  }

  resources(ctx) {
    const resources = ctx.resource.map(resource => this.visit(resource));

    return {
      type: "RESOURCES",
      resources: resources
    };
  }

  resource(ctx) {
    const modifiers = ctx.variableModifier.map(modifier =>
      this.visit(modifier)
    );
    const typeType = this.visit(ctx.classOrInterfaceType);
    const id = this.visit(ctx.variableDeclaratorId);
    const expression = this.visit(ctx.expression);

    return {
      type: "RESOURCE",
      modifiers: modifiers,
      typeType: typeType,
      id: id,
      expression: expression
    };
  }

  switchBlockStatementGroup(ctx) {
    const labels = ctx.switchLabel.map(switchLabel => this.visit(switchLabel));
    const statements = ctx.blockStatement.map(blockStatement =>
      this.visit(blockStatement)
    );

    return {
      type: "SWITCH_BLOCK_STATEMENT_GROUP",
      labels: labels,
      statements: statements
    };
  }

  switchLabel(ctx) {
    if (ctx.switchLabelCase.length > 0) {
      return this.visit(ctx.switchLabelCase);
    }
    if (ctx.switchLabelDefault.length > 0) {
      return this.visit(ctx.switchLabelDefault);
    }
  }

  switchLabelCase(ctx) {
    const expression = this.visit(ctx.expression);

    return {
      type: "SWITCH_LABEL_CASE",
      expression: expression
    };
  }

  switchLabelDefault() {
    return {
      type: "SWITCH_LABEL_DEFAULT"
    };
  }

  forStatement(ctx) {
    const forControl = this.visit(ctx.forControl);
    const statement = this.visit(ctx.statement);

    return {
      type: "FOR_STATEMENT",
      forControl: forControl,
      statement: statement
    };
  }

  forControl(ctx) {
    if (ctx.Colon.length > 0) {
      const enhancedForStatement = {
        type: "ENHANCED_FOR_STATEMENT",
        declaration: undefined,
        expression: undefined
      };

      const modifiers = ctx.variableModifier.map(modifier =>
        this.visit(modifier)
      );

      const typeType = this.visit(ctx.expression[0]);

      const variableDeclaratorId = this.visit(ctx.variableDeclaratorId);
      const variableInitializer = this.visit(ctx.variableInitializer);
      const declarator = {
        type: "VARIABLE_DECLARATOR",
        id: variableDeclaratorId,
        init: variableInitializer
      };
      const declarators = {
        type: "VARIABLE_DECLARATORS",
        list: [declarator]
      };

      ctx.variableDeclarator.map(declarator =>
        declarators.list.push(this.visit(declarator))
      );

      enhancedForStatement.declaration = {
        type: "LOCAL_VARIABLE_DECLARATION",
        modifiers: modifiers,
        typeType: typeType,
        declarators: declarators
      };

      enhancedForStatement.expression = this.visit(ctx.expression[1]);

      return enhancedForStatement;
    }

    if (ctx.SemiColon.length == 2) {
      const basicForStatement = {
        type: "BASIC_FOR_STATEMENT",
        forInit: undefined,
        expression: undefined,
        expressionList: undefined
      };

      // Find if last expression was the optional one
      if (
        ctx.expression.length > 0 &&
        ctx.expression[ctx.expression.length - 1].optionalExpression
      ) {
        basicForStatement.expression = this.visit(
          ctx.expression[ctx.expression.length - 1]
        );
      }

      basicForStatement.expressionList = this.visit(ctx.expressionList);

      if (ctx.variableDeclaratorId.length > 0) {
        const modifiers = ctx.variableModifier.map(modifier =>
          this.visit(modifier)
        );
        const typeType = this.visit(ctx.expression);

        const variableDeclaratorId = this.visit(ctx.variableDeclaratorId);
        const variableInitializer = this.visit(ctx.variableInitializer);
        const declarator = {
          type: "VARIABLE_DECLARATOR",
          id: variableDeclaratorId,
          init: variableInitializer
        };
        const declarators = {
          type: "VARIABLE_DECLARATORS",
          list: [declarator]
        };

        ctx.variableDeclarator.map(declarator =>
          declarators.list.push(this.visit(declarator))
        );

        basicForStatement.forInit = {
          type: "LOCAL_VARIABLE_DECLARATION",
          modifiers: modifiers,
          typeType: typeType,
          declarators: declarators
        };

        return basicForStatement;
      }

      if (ctx.expression.length > 0) {
        const list = [];
        for (let i = 0; i < ctx.expression.length; i++) {
          if (!ctx.expression[i].optionalExpression) {
            list.push(this.visit(ctx.expression[i]));
          }
        }

        if (list.length > 0) {
          basicForStatement.forInit = {
            type: "EXPRESSION_LIST",
            list: list
          };
        }
      }

      return basicForStatement;
    }
  }

  enhancedForControl(ctx) {
    const modifiers = ctx.variableModifier.map(modifier =>
      this.visit(modifier)
    );
    const typeType = this.visit(ctx.typeType);
    const id = this.visit(ctx.variableDeclaratorId);
    const iterator = this.visit(ctx.expression);

    return {
      type: "ENHANCED_FOR_CONTROL",
      modifiers: modifiers,
      typeType: typeType,
      id: id,
      iterator: iterator
    };
  }

  explicitGenericInvocationSuffix(ctx) {
    if (ctx.super.length > 0) {
      return this.visit(ctx.super);
    }
    if (ctx.identifierArguments.length > 0) {
      return this.visit(ctx.identifierArguments);
    }
  }

  identifierArguments(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const args = this.visit(ctx.arguments);

    return {
      type: "IDENTIFIER_ARGUMENTS",
      name: name,
      arguments: args
    };
  }

  super(ctx) {
    const value = this.visit(ctx.superSuffix);

    return {
      type: "SUPER",
      arguments: value
    };
  }

  superSuffix(ctx) {
    if (ctx.arguments.length > 0) {
      return this.visit(ctx.arguments);
    }
    if (ctx.dotIdentifierArguments.length > 0) {
      return this.visit(ctx.dotIdentifierArguments);
    }
  }

  arguments(ctx) {
    if (ctx.expressionList.length > 0) {
      return this.visit(ctx.expressionList);
    }
    return {
      type: "EXPRESSION_LIST",
      list: []
    };
  }

  dotIdentifierArguments(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const args = this.visit(ctx.arguments);

    return {
      type: "DOT_IDENTIFIER_ARGUMENTS",
      name: name,
      arguments: args
    };
  }

  parExpression(ctx) {
    const expression = this.visit(ctx.expression);

    return {
      type: "PAR_EXPRESSION",
      expression: expression
    };
  }

  expressionList(ctx) {
    const list = ctx.expression.map(expression => this.visit(expression));

    return {
      type: "EXPRESSION_LIST",
      list: list ? list : []
    };
  }

  methodInvocation(ctx) {
    const name = this.identifier(ctx.Identifier[0]);
    const expressionList = this.visit(ctx.expressionList);

    return {
      type: "METHOD_INVOCATION",
      name: name,
      parameters: expressionList
    };
  }

  expression(ctx) {
    if (ctx.atomic.length > 0) {
      const atomic = this.visit(ctx.atomic);

      if (ctx.instanceofExpressionRest.length > 0) {
        const instanceofExpressionRest = this.visit(
          ctx.instanceofExpressionRest
        );

        return {
          type: "INSTANCEOF_EXPRESSION",
          expression: atomic,
          instanceof: instanceofExpressionRest.typeType
        };
      }

      if (ctx.squareExpressionRest.length > 0) {
        const squareExpressionRest = this.visit(ctx.squareExpressionRest);

        return {
          type: "SQUARE_EXPRESSION",
          expression: atomic,
          squareExpression: squareExpressionRest.expression
        };
      }

      if (ctx.postfixExpressionRest.length > 0) {
        const postfixExpressionRest = this.visit(ctx.postfixExpressionRest);

        return {
          type: "POSTFIX_EXPRESSION",
          postfix: postfixExpressionRest.value,
          expression: atomic
        };
      }

      if (ctx.ifElseExpressionRest.length > 0) {
        const ifElseExpressionRest = this.visit(ctx.ifElseExpressionRest);

        return {
          type: "IF_ELSE_EXPRESSION",
          condition: atomic,
          if: ifElseExpressionRest.if,
          else: ifElseExpressionRest.else
        };
      }

      if (ctx.qualifiedExpressionRest.length > 0) {
        const rest = this.visit(ctx.qualifiedExpressionRest);

        return {
          type: "QUALIFIED_EXPRESSION",
          expression: atomic,
          rest: rest
        };
      }

      if (ctx.operatorExpressionRest.length > 0) {
        const operatorExpressionRest = this.visit(ctx.operatorExpressionRest);

        return {
          type: "OPERATOR_EXPRESSION",
          left: atomic,
          operator: operatorExpressionRest.operator,
          right: operatorExpressionRest.expression
        };
      }

      if (ctx.Pointer.length > 0) {
        if (atomic.type !== "IDENTIFIER") {
          throw new MismatchedTokenException(
            "Found lambda expression but left side is not an identifier",
            undefined
          );
        }

        const body = this.visit(ctx.lambdaBody);

        return {
          type: "LAMBDA_EXPRESSION",
          parameters: {
            type: "IDENTIFIERS",
            identifiers: {
              type: "IDENTIFIER_LIST",
              identifiers: [atomic]
            }
          },
          body: body
        };
      }

      if (ctx.methodReferenceRest.length > 0) {
        const rest = this.visit(ctx.methodReferenceRest);

        return {
          type: "METHOD_REFERENCE",
          reference: atomic,
          typeArguments: rest.typeArguments,
          name: rest.name
        };
      }

      return atomic;
    }

    if (ctx.prefixExpression.length > 0) {
      return this.visit(ctx.prefixExpression);
    }

    if (ctx.parExpressionOrCastExpressionOrLambdaExpression.length > 0) {
      return this.visit(ctx.parExpressionOrCastExpressionOrLambdaExpression);
    }
  }

  atomic(ctx) {
    if (ctx.methodInvocation.length > 0) {
      return this.visit(ctx.methodInvocation);
    }

    if (ctx.primary.length > 0) {
      return this.visit(ctx.primary);
    }

    if (ctx.creator.length > 0) {
      return this.visit(ctx.creator);
    }
  }

  instanceofExpressionRest(ctx) {
    const typeType = this.visit(ctx.typeType);

    return {
      type: "INSTANCEOF_EXPRESSION_REST",
      typeType: typeType
    };
  }

  squareExpressionRest(ctx) {
    const expression = this.visit(ctx.expression);

    return {
      type: "SQUARE_EXPRESSION_REST",
      expression: expression
    };
  }

  postfixExpressionRest(ctx) {
    let value = undefined;

    if (ctx.PlusPlus.length > 0) {
      value = "++";
    }

    if (ctx.MinusMinus.length > 0) {
      value = "--";
    }

    return {
      type: "POSTFIX_EXPRESSION_REST",
      value: value
    };
  }

  ifElseExpressionRest(ctx) {
    const ifExpression = this.visit(ctx.expression[0]);
    const elseExpression = this.visit(ctx.expression[1]);

    return {
      type: "IF_ELSE_EXPRESSION_REST",
      if: ifExpression,
      else: elseExpression
    };
  }

  operatorExpressionRest(ctx) {
    let operator = undefined;
    // ('*'|'/'|'%')
    if (ctx.Star.length > 0) {
      operator = "*";
    }
    if (ctx.Dash.length > 0) {
      operator = "/";
    }
    if (ctx.Percentage.length > 0) {
      operator = "%";
    }
    // ('+'|'-')
    if (ctx.Plus.length > 0) {
      operator = "+";
    }
    if (ctx.Minus.length > 0) {
      operator = "-";
    }
    // ('<<' | '>>>' | '>>')
    if (ctx.LessLess.length > 0) {
      operator = "<<";
    }
    if (ctx.GreaterGreater.length > 0) {
      operator = ">>";
    }
    if (ctx.GreaterGreaterGreater.length > 0) {
      operator = ">>>";
    }
    // ('<=' | '>=' | '>' | '<')
    if (ctx.LessEquals.length > 0) {
      operator = "<=";
    }
    if (ctx.GreaterEquals.length > 0) {
      operator = ">=";
    }
    if (ctx.Greater.length > 0) {
      operator = ">";
    }
    if (ctx.Less.length > 0) {
      operator = "<";
    }
    // ('==' | '!=')
    if (ctx.EqualsEquals.length > 0) {
      operator = "==";
    }
    if (ctx.ExclamationmarkEquals.length > 0) {
      operator = "!=";
    }
    // '&'
    if (ctx.And.length > 0) {
      operator = "&";
    }
    // '^'
    if (ctx.Caret.length > 0) {
      operator = "^";
    }
    // '|'
    if (ctx.Or.length > 0) {
      operator = "|";
    }
    // '&&'
    if (ctx.AndAnd.length > 0) {
      operator = "&&";
    }
    // '||'
    if (ctx.OrOr.length > 0) {
      operator = "||";
    }
    // ('=' | '+=' | '-=' | '*=' | '/=' | '&=' | '|=' | '^=' | '>>=' | '>>>=' | '<<=' | '%=')
    if (ctx.Equals.length > 0) {
      operator = "=";
    }
    if (ctx.PlusEquals.length > 0) {
      operator = "+=";
    }
    if (ctx.MinusEquals.length > 0) {
      operator = "-=";
    }
    if (ctx.StarEquals.length > 0) {
      operator = "*=";
    }
    if (ctx.DashEquals.length > 0) {
      operator = "/=";
    }
    if (ctx.AndEquals.length > 0) {
      operator = "&=";
    }
    if (ctx.OrEquals.length > 0) {
      operator = "|=";
    }
    if (ctx.CaretEquals.length > 0) {
      operator = "^=";
    }
    if (ctx.GreaterGreaterEquals.length > 0) {
      operator = ">>=";
    }
    if (ctx.GreaterGreaterGreaterEquals.length > 0) {
      operator = ">>>=";
    }
    if (ctx.LessLessEquals.length > 0) {
      operator = "<<=";
    }
    if (ctx.PercentageEquals.length > 0) {
      operator = "%=";
    }

    const right = this.visit(ctx.expression);

    if (operator) {
      return {
        type: "OPERATOR_EXPRESSION_REST",
        operator: operator,
        expression: right
      };
    }
  }

  qualifiedExpressionRest(ctx) {
    let expression = undefined;

    if (ctx.Identifier.length > 0) {
      expression = this.identifier(ctx.Identifier[0]);
    }

    if (ctx.methodInvocation.length > 0) {
      expression = this.visit(ctx.methodInvocation);
    }

    if (ctx.This.length > 0) {
      expression = {
        type: "THIS"
      };
    }

    if (ctx.Super.length > 0) {
      expression = {
        type: "SUPER"
      };
    }

    if (ctx.Class.length > 0) {
      expression = {
        type: "CLASS"
      };
    }

    if (ctx.creatorOptionalNonWildcardInnerCreator.length > 0) {
      expression = this.visit(ctx.creatorOptionalNonWildcardInnerCreator);
    }

    if (ctx.explicitGenericInvocation.length > 0) {
      expression = this.visit(ctx.explicitGenericInvocation);
    }

    if (ctx.qualifiedExpressionRest.length > 0) {
      const rest = this.visit(ctx.qualifiedExpressionRest);

      return {
        type: "QUALIFIED_EXPRESSION",
        expression: expression,
        rest: rest
      };
    }

    if (ctx.methodReferenceRest.length > 0) {
      const rest = this.visit(ctx.methodReferenceRest);

      return {
        type: "METHOD_REFERENCE",
        reference: expression,
        typeArguments: rest.typeArguments,
        name: rest.name
      };
    }

    return expression;
  }

  parExpressionOrCastExpressionOrLambdaExpression(ctx) {
    if (ctx.Pointer.length > 0) {
      const body = this.visit(ctx.lambdaBody);

      let parameters = undefined;
      if (ctx.variableDeclaratorId.length > 0) {
        parameters = {
          type: "FORMAL_PARAMETERS",
          parameters: []
        };
      } else {
        parameters = {
          type: "IDENTIFIERS",
          identifiers: undefined
        };
      }
      if (ctx.expression.length > 0) {
        if (ctx.variableDeclaratorId.length > 0) {
          parameters.parameters = [];

          for (let i = 0; i < ctx.expression.length; i++) {
            const typeType = this.visit(ctx.expression[i]);

            const variableDeclaratorId = this.visit(
              ctx.variableDeclaratorId[i]
            );

            if (typeType.type !== "PRIMITIVE_TYPE") {
              throw new MismatchedTokenException(
                "Found lambda expression but left side is not a primitive type",
                undefined
              );
            }

            const modifiers = [];
            if (ctx.Final.find(final => final.cnt === i) !== undefined) {
              modifiers.push({
                type: "MODIFIER",
                value: "final"
              });
            }

            parameters.parameters.push({
              type: "FORMAL_PARAMETER",
              modifiers: modifiers,
              typeType: typeType,
              id: variableDeclaratorId,
              dotDotDot: false
            });
          }
        } else {
          parameters.identifiers = {
            type: "IDENTIFIER_LIST",
            identifiers: []
          };

          parameters.identifiers.identifiers = ctx.expression.map(
            expression => {
              const identifier = this.visit(expression);
              if (identifier.type !== "IDENTIFIER") {
                throw new MismatchedTokenException(
                  "Found lambda expression but left side is not an identifier",
                  undefined
                );
              }

              return identifier;
            }
          );
        }
      }

      return {
        type: "LAMBDA_EXPRESSION",
        parameters: parameters,
        body: body
      };
    }

    if (ctx.Final.length > 0) {
      throw new MismatchedTokenException(
        "Found cast expression or parenthis expression with final modifier",
        undefined
      );
    }

    if (ctx.expression.length >= 2) {
      // We have a cast expression

      const value = this.visit(ctx.expression[0]);
      const expression = this.visit(ctx.expression[1]);

      // if identifier is not an identifier throw error
      if (
        value.type !== "IDENTIFIER" &&
        value.type !== "CLASS_OR_INTERFACE_TYPE_ELEMENT" &&
        value.type !== "TYPE_TYPE" &&
        value.type !== "PRIMITIVE_TYPE"
      ) {
        throw new MismatchedTokenException(
          "Found cast expression but cast expression is not an Identifier",
          undefined
        );
      }

      return {
        type: "CAST_EXPRESSION",
        castType: value,
        expression: expression
      };
    }

    // parExpression

    // if parExpression
    // -> no
    //       - annotations
    //       - typeArguments
    //       - LSquare/RSquare
    // -> only one expression

    if (
      // ctx.annotation.length > 0 ||
      // ctx.typeArguments.length > 0 ||
      // ctx.LSquare.length > 0 ||
      ctx.expression.length !== 1
    ) {
      throw new MismatchedTokenException(
        "Found parenthesis expression with annotations, typeArguments or Squares",
        undefined
      );
    }

    const expression = this.visit(ctx.expression);

    return {
      type: "PAR_EXPRESSION",
      expression: expression
    };
  }

  creatorOptionalNonWildcardInnerCreator(ctx) {
    const typeArguments = this.visit(ctx.nonWildcardTypeArguments);
    const innerCreator = this.visit(ctx.innerCreator);

    return {
      type: "CREATOR_OPTIONAL_NON_WILDCARD_INNER_CREATOR",
      typeArguments: typeArguments,
      innerCreator: innerCreator
    };
  }

  prefixExpression(ctx) {
    let prefix = undefined;

    if (ctx.Plus.length > 0) {
      prefix = "+";
    }

    if (ctx.Minus.length > 0) {
      prefix = "-";
    }

    if (ctx.PlusPlus.length > 0) {
      prefix = "++";
    }

    if (ctx.MinusMinus.length > 0) {
      prefix = "--";
    }

    if (ctx.Tilde.length > 0) {
      prefix = "~";
    }

    if (ctx.Exclamationmark.length > 0) {
      prefix = "!";
    }

    const expression = this.visit(ctx.expression);

    return {
      type: "PREFIX_EXPRESSION",
      prefix: prefix,
      expression: expression
    };
  }

  methodReferenceRest(ctx) {
    let name = undefined;
    if (ctx.Identifier.length > 0) {
      name = this.identifier(ctx.Identifier[0]);
    } else if (ctx.New.length > 0) {
      name = {
        type: "NEW"
      };
    }

    const typeArguments = this.visit(ctx.typeArguments);

    return {
      type: "METHOD_REFERENCE_REST",
      typeArguments: typeArguments,
      name: name
    };
  }

  lambdaExpression(ctx) {
    const parameters = this.visit(ctx.lambdaParameters);
    const body = this.visit(ctx.lambdaBody);

    return {
      type: "LAMBDA_EXPRESSION",
      parameters: parameters,
      body: body
    };
  }

  lambdaParameters(ctx) {
    if (ctx.Identifier.length > 0) {
      return this.identifier(ctx.Identifier[0]);
    }

    if (ctx.formalParameterList.length > 0) {
      const parameters = this.visit(ctx.formalParameterList);

      return {
        type: "FORMAL_PARAMETERS",
        parameters: parameters ? parameters : []
      };
    }

    if (ctx.identifierList.length > 0) {
      const identifiers = this.visit(ctx.identifierList);

      return {
        type: "IDENTIFIERS",
        identifiers: identifiers
      };
    }

    if (ctx.LBrace.length > 0) {
      return {
        type: "FORMAL_PARAMETERS",
        parameters: []
      };
    }
  }

  lambdaBody(ctx) {
    if (ctx.block.length > 0) {
      return this.visit(ctx.block);
    }

    if (ctx.expression.length > 0) {
      return this.visit(ctx.expression);
    }
  }

  classType(ctx) {
    const annotations = ctx.annotation.map(annotation =>
      this.visit(annotation)
    );
    const classOrInterfaceType = this.visit(ctx.classOrInterfaceType);

    return {
      type: "CLASS_TYPE",
      annotations: annotations,
      classOrInterfaceType: classOrInterfaceType
    };
  }

  creator(ctx) {
    if (ctx.nonWildcardCreator.length > 0) {
      return this.visit(ctx.nonWildcardCreator);
    }

    if (ctx.simpleCreator.length > 0) {
      return this.visit(ctx.simpleCreator);
    }
  }

  nonWildcardCreator(ctx) {
    const typeArguments = this.visit(ctx.nonWildcardTypeArguments);
    const name = this.visit(ctx.createdName);
    const rest = this.visit(ctx.classCreatorRest);

    return {
      type: "NON_WILDCARD_CREATOR",
      typeArguments: typeArguments,
      name: name,
      rest: rest
    };
  }

  simpleCreator(ctx) {
    const name = this.visit(ctx.createdName);
    let rest = undefined;
    if (ctx.arrayCreatorRest.length > 0) {
      rest = this.visit(ctx.arrayCreatorRest);
    }
    if (ctx.classCreatorRest.length > 0) {
      rest = this.visit(ctx.classCreatorRest);
    }

    return {
      type: "SIMPLE_CREATOR",
      name: name,
      rest: rest
    };
  }

  createdName(ctx) {
    if (ctx.identifierName.length > 0) {
      return this.visit(ctx.identifierName);
    }

    if (ctx.primitiveType.length > 0) {
      return this.visit(ctx.primitiveType);
    }
  }

  identifierName(ctx) {
    const elements = ctx.identifierNameElement.map(identifierNameElement =>
      this.visit(identifierNameElement)
    );

    return {
      type: "IDENTIFIER_NAME",
      elements: elements
    };
  }

  identifierNameElement(ctx) {
    const id = this.identifier(ctx.Identifier[0]);
    const typeArguments = this.visit(ctx.nonWildcardTypeArgumentsOrDiamond);

    return {
      type: "IDENTIFIER_NAME_ELEMENT",
      id: id,
      typeArguments: typeArguments
    };
  }

  innerCreator(ctx) {
    const id = this.identifier(ctx.Identifier[0]);
    const typeArguments = this.visit(ctx.nonWildcardTypeArgumentsOrDiamond);
    const rest = this.visit(ctx.classCreatorRest);

    return {
      type: "INNER_CREATOR",
      id: id,
      typeArguments: typeArguments,
      rest: rest
    };
  }

  arrayCreatorRest(ctx) {
    const expressions = ctx.expression.map(expression =>
      this.visit(expression)
    );
    const cntSquares = ctx.LSquare.length - expressions.length;
    const arrayInitializer = this.visit(ctx.arrayInitializer);

    return {
      type: "ARRAY_CREATOR_REST",
      expressions: expressions,
      cntSquares: cntSquares,
      arrayInitializer: arrayInitializer
    };
  }

  classCreatorRest(ctx) {
    const args = this.visit(ctx.arguments);
    const body = this.visit(ctx.classBody);

    return {
      type: "CLASS_CREATOR_REST",
      arguments: args,
      body: body
    };
  }

  explicitGenericInvocation(ctx) {
    const typeArguments = this.visit(ctx.nonWildcardTypeArguments);
    const invocation = this.visit(ctx.explicitGenericInvocationSuffix);

    return {
      type: "EXPLICIT_GENERIC_INVOCATION",
      typeArguments: typeArguments,
      invocation: invocation
    };
  }

  typeArgumentsOrDiamond(ctx) {
    if (ctx.emptyDiamond.length > 0) {
      return this.visit(ctx.emptyDiamond);
    }

    if (ctx.typeArguments.length > 0) {
      return this.visit(ctx.typeArguments);
    }
  }

  nonWildcardTypeArgumentsOrDiamond(ctx) {
    if (ctx.emptyDiamond.length > 0) {
      return this.visit(ctx.emptyDiamond);
    }

    if (ctx.nonWildcardTypeArguments.length > 0) {
      return this.visit(ctx.nonWildcardTypeArguments);
    }
  }

  emptyDiamond() {
    return {
      type: "EMPTY_DIAMOND"
    };
  }

  nonWildcardTypeArguments(ctx) {
    const typeList = this.visit(ctx.typeList);
    return {
      type: "NON_WILDCARD_TYPE_ARGUMENTS",
      typeList: typeList
    };
  }

  qualifiedName(ctx) {
    const name = ctx.Identifier.map(identToken => this.identifier(identToken));
    return {
      type: "QUALIFIED_NAME",
      name: name
    };
  }

  primary(ctx) {
    if (ctx.nonWildcardTypeArguments.length > 0) {
      const typeArguments = this.visit(ctx.nonWildcardTypeArguments);
      let args = undefined;
      if (ctx.explicitGenericInvocationSuffix.length > 0) {
        args = this.visit(ctx.explicitGenericInvocationSuffix);
      }
      if (ctx.arguments.length > 0) {
        args = {
          type: "THIS",
          arguments: this.visit(ctx.arguments)
        };
      }

      return {
        type: "GENERIC_INVOCATION",
        typeArguments: typeArguments,
        arguments: args
      };
    }

    if (ctx.thisOrSuper.length > 0) {
      return this.visit(ctx.thisOrSuper);
    }

    if (ctx.literal.length > 0) {
      return this.visit(ctx.literal);
    }

    if (ctx.Void.length > 0) {
      return {
        type: "VOID"
      };
    }

    const annotations = ctx.annotation.map(annotation =>
      this.visit(annotation)
    );
    const cntSquares = ctx.LSquare.length;

    let value = undefined;
    if (ctx.primitiveType.length > 0) {
      value = this.visit(ctx.primitiveType);
      // if empty typeType return child
      if (annotations.length === 0 && cntSquares === 0) {
        return value;
      }
    } else if (ctx.Identifier && ctx.Identifier.length > 0) {
      const name = this.identifier(ctx.Identifier[0]);
      let typeArguments = this.visit(ctx.typeArguments);
      if (ctx.Less.length > 0) {
        // found typeArguments
        const args = ctx.typeArgument.map(typeArgument =>
          this.visit(typeArgument)
        );

        if (ctx.Greater.length > 0) {
          // found typeArguments
          typeArguments = {
            type: "TYPE_ARGUMENTS",
            arguments: args
          };
        } else {
          // found operator expression with operator "<"
          return {
            type: "OPERATOR_EXPRESSION",
            left: name,
            operator: "<",
            right: args[0]
          };
        }
      }

      if (!typeArguments) {
        value = name;
      } else {
        value = {
          type: "CLASS_OR_INTERFACE_TYPE_ELEMENT",
          name: name,
          typeArguments: typeArguments
        };
      }
    }

    if (!value) {
      return annotations[0];
    }

    if (annotations.length === 0 && cntSquares === 0) {
      return value;
    }

    return {
      type: "TYPE_TYPE",
      modifiers: annotations,
      value: value,
      cntSquares: cntSquares
    };
  }

  thisOrSuper(ctx) {
    if (ctx.This.length > 0) {
      if (ctx.arguments.length > 0) {
        return {
          type: "THIS",
          arguments: this.visit(ctx.arguments)
        };
      }
      return {
        type: "THIS"
      };
    }

    if (ctx.Super.length > 0) {
      if (ctx.arguments.length > 0) {
        return {
          type: "SUPER",
          arguments: this.visit(ctx.arguments)
        };
      }
      return {
        type: "SUPER"
      };
    }
  }

  literal(ctx) {
    if (ctx.integerLiteral.length > 0) {
      return this.visit(ctx.integerLiteral);
    }

    if (ctx.floatLiteral.length > 0) {
      return this.visit(ctx.floatLiteral);
    }

    if (ctx.CharLiteral.length > 0) {
      const value = ctx.CharLiteral[0].image;

      return {
        type: "CHAR_LITERAL",
        value: value
      };
    }

    if (ctx.stringLiteral.length > 0) {
      return this.visit(ctx.stringLiteral);
    }

    if (ctx.booleanLiteral.length > 0) {
      return this.visit(ctx.booleanLiteral);
    }

    if (ctx.Null.length > 0) {
      return {
        type: "NULL"
      };
    }
  }

  stringLiteral(ctx) {
    const value = ctx.StringLiteral[0].image;

    return {
      type: "STRING_LITERAL",
      value: value
    };
  }

  booleanLiteral(ctx) {
    let value = undefined;
    if (ctx.True.length > 0) {
      value = "true";
    }

    if (ctx.False.length > 0) {
      value = "false";
    }

    return {
      type: "BOOLEAN_LITERAL",
      value: value
    };
  }

  integerLiteral(ctx) {
    if (ctx.DecimalLiteral.length > 0) {
      const value = ctx.DecimalLiteral[0].image;

      return {
        type: "DECIMAL_LITERAL",
        value: value
      };
    }

    if (ctx.HexLiteral.length > 0) {
      const value = ctx.HexLiteral[0].image;

      return {
        type: "HEX_LITERAL",
        value: value
      };
    }

    if (ctx.OctLiteral.length > 0) {
      const value = ctx.OctLiteral[0].image;

      return {
        type: "OCT_LITERAL",
        value: value
      };
    }

    if (ctx.BinaryLiteral.length > 0) {
      const value = ctx.BinaryLiteral[0].image;

      return {
        type: "BINARY_LITERAL",
        value: value
      };
    }
  }

  floatLiteral(ctx) {
    if (ctx.FloatLiteral.length > 0) {
      const value = ctx.FloatLiteral[0].image;

      return {
        type: "FLOAT_LITERAL",
        value: value
      };
    }

    if (ctx.HexFloatLiteral.length > 0) {
      const value = ctx.HexFloatLiteral[0].image;

      return {
        type: "HEX_FLOAT_LITERAL",
        value: value
      };
    }
  }

  hexFloatLiteral(ctx) {
    const value = ctx.HexFloatLiteral[0].image;

    return {
      type: "HEX_FLOAT_LITERAL",
      value: value
    };
  }

  primitiveType(ctx) {
    let value = "";
    if (ctx.Boolean.length > 0) {
      value = "boolean";
    } else if (ctx.Char.length > 0) {
      value = "char";
    } else if (ctx.Byte.length > 0) {
      value = "byte";
    } else if (ctx.Short.length > 0) {
      value = "short";
    } else if (ctx.Int.length > 0) {
      value = "int";
    } else if (ctx.Long.length > 0) {
      value = "long";
    } else if (ctx.Float.length > 0) {
      value = "float";
    } else if (ctx.Double.length > 0) {
      value = "double";
    }

    return {
      type: "PRIMITIVE_TYPE",
      value: value
    };
  }

  identifier(value) {
    return {
      type: "IDENTIFIER",
      value: value.image
    };
  }
}

module.exports = SQLToAstVisitor;
