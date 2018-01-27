"use strict";
const chevrotain = require("chevrotain");
const { allTokens, tokens } = require("./tokens");

const Parser = chevrotain.Parser;

class SelectParser extends chevrotain.Parser {
  constructor(input) {
    super(input, allTokens, { outputCst: true });

    const $ = this;

    $.RULE("compilationUnit", () => {
      $.OPTION(() => {
        $.SUBRULE($.packageDeclaration);
      });
      $.MANY(() => {
        $.SUBRULE($.importDeclaration);
      });
      $.MANY2(() => {
        $.SUBRULE($.typeDeclaration);
      });
    });

    $.RULE("packageDeclaration", () => {
      $.CONSUME(tokens.Package);
      $.SUBRULE($.qualifiedName);
      $.CONSUME(tokens.SemiColon);
    });

    $.RULE("importDeclaration", () => {
      $.CONSUME(tokens.Import);
      $.OPTION(() => {
        $.CONSUME(tokens.Static);
      });
      $.SUBRULE($.qualifiedName);
      $.OPTION2(() => {
        $.CONSUME(tokens.Dot);
        $.CONSUME(tokens.Star);
      });
      $.CONSUME(tokens.SemiColon);
    });

    // typeDeclaration
    // : classOrInterfaceModifier*
    //   (classDeclaration | enumDeclaration | interfaceDeclaration | annotationTypeDeclaration)
    // | ';'
    // ;

    $.RULE("typeDeclaration", () => {
      // $.MANY(() => {
      //   $.SUBRULE($.classOrInterfaceModifier);
      // });
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.classDeclaration);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.enumDeclaration);
          }
        }
        // ,
        //   {
        //     ALT: () => {
        //       $.SUBRULE($.interfaceDeclaration);
        //     }
        //   },
        //   {
        //     ALT: () => {
        //       $.SUBRULE($.annotationTypeDeclaration);
        //     }
        //   }
      ]);
    });

    // classDeclaration
    // : CLASS IDENTIFIER typeParameters?
    //   (EXTENDS typeType)?
    //   (IMPLEMENTS typeList)?
    //   classBody
    // ;
    $.RULE("classDeclaration", () => {
      $.CONSUME(tokens.Class);
      $.CONSUME(tokens.Identifier);
      // $.OPTION(() => {
      //   $.SUBRULE($.typeParameters);
      // });
      // $.OPTION2(() => {
      //   $.CONSUME(tokens.Extends);
      //   $.SUBRULE($.typeType);
      // });
      // $.OPTION3(() => {
      //   $.CONSUME(tokens.Implements);
      //   $.SUBRULE($.typeList);
      // });
      $.SUBRULE($.classBody);
    });

    // classBody
    // : '{' classBodyDeclaration* '}'
    // ;
    $.RULE("classBody", () => {
      $.CONSUME(tokens.LCurly);
      // $.MANY(() => {
      //   $.SUBRULE($.classBodyDeclaration);
      // });
      $.CONSUME(tokens.RCurly);
    });

    // enumDeclaration
    // : ENUM IDENTIFIER (IMPLEMENTS typeList)? '{' enumConstants? ','? enumBodyDeclarations? '}'
    // ;
    $.RULE("enumDeclaration", () => {
      $.CONSUME(tokens.Enum);
      $.CONSUME(tokens.Identifier);
      // $.OPTION(() => {
      //   $.CONSUME(tokens.Implements);
      //   $.SUBRULE($.typeList);
      // });
      $.CONSUME(tokens.LCurly);
      // $.OPTION2(() => {
      //   $.SUBRULE($.enumConstants);
      // });
      // $.OPTION3(() => {
      //   $.CONSUME(tokens.Comma);
      // });
      // $.OPTION4(() => {
      //   $.SUBRULE($.enumBodyDeclarations);
      // });
      $.CONSUME(tokens.RCurly);
    });

    $.RULE("qualifiedName", () => {
      $.CONSUME(tokens.Identifier);
      $.MANY({
        // The gate condition is in addition to basic grammar lookahead, so this.LA(1) === dot
        // is always checked
        GATE: function() {
          return this.LA(2).tokenType === tokens.Identifier;
        },
        DEF: function() {
          $.CONSUME(tokens.Dot);
          $.CONSUME2(tokens.Identifier);
        }
      });
    });

    Parser.performSelfAnalysis(this);
  }
}

module.exports = SelectParser;
