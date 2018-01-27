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
      declaration: declaration
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
