"use strict";
const JavaParser = require("./parser");

const parser = new JavaParser([]);
const BaseSQLVisitor = parser.getBaseCstVisitorConstructor();

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

    return {
      type: "CLASS_DECLARATION",
      name: name,
      body: body
    };
  }

  classBody(/*ctx*/) {
    return {
      type: "CLASS_BODY"
    };
  }

  enumDeclaration(ctx) {
    const name = ctx.Identifier[0].image;

    return {
      type: "ENUM_DECLARATION",
      name: name
    };
  }

  interfaceDeclaration(ctx) {
    const name = ctx.Identifier[0].image;
    const body = this.visit(ctx.interfaceBody);

    return {
      type: "INTERFACE_DECLARATION",
      name: name,
      body: body
    };
  }

  interfaceBody(/*ctx*/) {
    return {
      type: "INTERFACE_BODY"
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
    const value = this.visit(ctx.annotationMethodRest);

    return {
      type: "ANNOTATION_METHOD_REST_OR_CONSTANT_REST",
      value: value
    };
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

  defaultValue(ctx) {
    const value = this.visit(ctx.elementValue);

    return {
      type: "DEFAULT_VALUE",
      value: value
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
}

module.exports = SQLToAstVisitor;
