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
    let declaration = this.visit(ctx.classDeclaration);
    if (!declaration) {
      declaration = this.visit(ctx.enumDeclaration);
    }
    if (!declaration) {
      declaration = this.visit(ctx.interfaceDeclaration);
    }
    if (!declaration) {
      declaration = this.visit(ctx.annotationTypeDeclaration);
    }

    return {
      type: "TYPE_DECLARATION",
      modifiers: modifiers,
      declaration: declaration
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

  annotationTypeBody(/*ctx*/) {
    return {
      type: "ANNOTATION_TYPE_BODY"
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
