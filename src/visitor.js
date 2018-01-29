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
      name.name.push("*");
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
        value = this.visit(ctx.elementValue);
      } else if (ctx.elementValuePairs.length > 0) {
        value = this.visit(ctx.elementValuePairs);
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
    const key = ctx.Identifier[0].image;
    const value = this.visit(ctx.elementValue);

    return {
      type: "ELEMENT_VALUE_PAIR",
      key: key,
      value: value
    };
  }

  elementValue(ctx) {
    if (ctx.annotation.length > 0) {
      return this.visit(ctx.annotation);
    } else if (ctx.elementValueArrayInitializer.length > 0) {
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
    const name = ctx.Identifier[0].image;
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
    const name = ctx.Identifier[0].image;
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
    if (ctx.methodDeclaration.length > 0) {
      return this.visit(ctx.methodDeclaration);
    } else if (ctx.constructorDeclaration.length > 0) {
      return this.visit(ctx.constructorDeclaration);
    } else if (ctx.interfaceDeclaration.length > 0) {
      return this.visit(ctx.interfaceDeclaration);
    } else if (ctx.annotationTypeDeclaration.length > 0) {
      return this.visit(ctx.annotationTypeDeclaration);
    } else if (ctx.classDeclaration.length > 0) {
      return this.visit(ctx.classDeclaration);
    } else if (ctx.enumDeclaration.length > 0) {
      return this.visit(ctx.enumDeclaration);
    }
  }

  methodDeclaration(ctx) {
    const typeType = this.visit(ctx.typeTypeOrVoid);
    const name = ctx.Identifier[0].image;
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

  genericMethodDeclaration(ctx) {
    const typeParameters = this.visit(ctx.typeParameters);
    const methodDeclaration = this.visit(ctx.methodDeclaration);

    return {
      type: "GENERIC_METHOD_DECLARATION",
      typeParameters: typeParameters,
      methodDeclaration: methodDeclaration
    };
  }

  constructorDeclaration(ctx) {
    const name = ctx.Identifier[0].image;
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

  genericConstructorDeclaration(ctx) {
    const typeParameters = this.visit(ctx.typeParameters);
    const constructorDeclaration = this.visit(ctx.constructorDeclaration);

    return {
      type: "GENERIC_CONSTRUCTOR_DECLARATION",
      typeParameters: typeParameters,
      constructorDeclaration: constructorDeclaration
    };
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
    return this.visit(ctx.block);
  }

  enumDeclaration(ctx) {
    const name = ctx.Identifier[0].image;
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
    const name = ctx.Identifier[0].image;
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
    const name = ctx.Identifier[0].image;
    const typeParameters = this.visit(ctx.typeParameters);
    const typeList = this.visit(ctx.typeList);
    const body = this.visit(ctx.interfaceBody);

    return {
      type: "INTERFACE_DECLARATION",
      name: name,
      typeParameters: typeParameters,
      typeList: typeList,
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
    if (ctx.interfaceMethodDeclaration.length > 0) {
      return this.visit(ctx.interfaceMethodDeclaration);
    } else if (ctx.interfaceDeclaration.length > 0) {
      return this.visit(ctx.interfaceDeclaration);
    } else if (ctx.classDeclaration.length > 0) {
      return this.visit(ctx.classDeclaration);
    } else if (ctx.enumDeclaration.length > 0) {
      return this.visit(ctx.enumDeclaration);
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
    const name = ctx.Identifier[0].image;
    const cntSquares = ctx.LSquare.length;

    return {
      type: "CONSTANT_DECLARATOR",
      name: name,
      cntSquares: cntSquares,
      init: undefined
    };
  }

  interfaceMethodDeclaration(ctx) {
    const modifiers = ctx.interfaceMethodModifier.map(modifier =>
      this.visit(modifier)
    );
    const typeParameters = this.visit(ctx.typeParameters);
    const typeType = this.visit(ctx.typeTypeOrVoid);
    const name = ctx.Identifier[0].image;
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

  genericInterfaceMethodDeclaration(ctx) {
    const typeParameters = this.visit(ctx.typeParameters);
    const interfaceMethodDeclaration = this.visit(
      ctx.interfaceMethodDeclaration
    );

    return {
      type: "GENERIC_INTERFACE_METHOD_DECLARATION",
      typeParameters: typeParameters,
      interfaceMethodDeclaration: interfaceMethodDeclaration
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
    return {
      type: "VARIABLE_DECLARATOR",
      id: id,
      init: undefined
    };
  }

  variableDeclaratorId(ctx) {
    const id = ctx.Identifier[0].image;
    const cntSquares = ctx.LSquare.length;
    return {
      type: "VARIABLE_DECLARATOR_ID",
      id: id,
      cntSquares: cntSquares
    };
  }

  annotationTypeDeclaration(ctx) {
    const name = ctx.Identifier[0].image;
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
    const name = ctx.Identifier[0].image;
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

  block(/*ctx*/) {
    return {
      type: "BLOCK",
      statements: []
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
    let value = undefined;
    if (ctx.primitiveType.length > 0) {
      value = this.visit(ctx.primitiveType);
    } else if (ctx.classOrInterfaceType.length > 0) {
      value = this.visit(ctx.classOrInterfaceType);
    }
    const cntSquares = ctx.LSquare.length;
    return {
      type: "TYPE_TYPE",
      annotations: annotations,
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

    return {
      type: "CLASS_OR_INTERFACE_TYPE",
      elements: elements
    };
  }

  classOrInterfaceTypeElement(ctx) {
    const name = ctx.Identifier[0].image;
    const typeArguments = this.visit(ctx.typeArguments);

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

  formalParameters(ctx) {
    const parameters = this.visit(ctx.formalParameterList);

    return {
      type: "FORMAL_PARAMETERS",
      parameters: parameters
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

    return {
      type: "FORMAL_PARAMETER_LIST",
      formalParameters: formalParameters
    };
  }

  formalParameter(ctx) {
    const modifiers = ctx.variableModifier.map(modifier =>
      this.visit(modifier)
    );
    const isDotDotDot = ctx.DotDotDot.length > 0;
    const id = this.visit(ctx.variableDeclaratorId);

    return {
      type: "FORMAL_PARAMETER",
      modifiers: modifiers,
      dotDotDot: isDotDotDot,
      id: id
    };
  }

  lastFormalParameter(ctx) {
    const modifiers = ctx.variableModifier.map(modifier =>
      this.visit(modifier)
    );
    const id = this.visit(ctx.variableDeclaratorId);

    return {
      type: "LAST_FORMAL_PARAMETER",
      modifiers: modifiers,
      id: id
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

  qualifiedName(ctx) {
    const name = ctx.Identifier.map(identToken => identToken.image);
    return {
      type: "QUALIFIED_NAME",
      name: name
    };
  }

  arguments(/*ctx*/) {
    return {
      type: "ARGUMENTS"
    };
  }
}

module.exports = SQLToAstVisitor;
