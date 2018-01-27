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

    return {
      type: "COMPILATION_UNIT",
      package: pkg,
      imports: imports,
      types: undefined
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

  qualifiedName(ctx) {
    const name = ctx.Identifier.map(identToken => identToken.image);
    return {
      type: "QUALIFIED_NAME",
      name: name
    };
  }
}

module.exports = SQLToAstVisitor;
