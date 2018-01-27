"use strict";
const chevrotain = require("chevrotain");
const { allTokens, tokens } = require("./tokens");

const Parser = chevrotain.Parser;

class SelectParser extends chevrotain.Parser {
  constructor(input) {
    super(input, allTokens, { outputCst: true });

    const $ = this;

    // compilationUnit
    // : packageDeclaration? importDeclaration* typeDeclaration* EOF
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

    // packageDeclaration
    // : annotation* PACKAGE qualifiedName ';'
    $.RULE("packageDeclaration", () => {
      $.CONSUME(tokens.Package);
      $.SUBRULE($.qualifiedName);
      $.CONSUME(tokens.SemiColon);
    });

    // importDeclaration
    // : IMPORT STATIC? qualifiedName ('.' '*')? ';'
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
    $.RULE("typeDeclaration", () => {
      $.MANY(() => {
        $.SUBRULE($.classOrInterfaceModifier);
      });
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
        },
        {
          ALT: () => {
            $.SUBRULE($.interfaceDeclaration);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.annotationTypeDeclaration);
          }
        }
      ]);
    });

    // classOrInterfaceModifier
    // : annotation
    // | PUBLIC
    // | PROTECTED
    // | PRIVATE
    // | STATIC
    // | ABSTRACT
    // | FINAL    // FINAL for class only -- does not apply to interfaces
    // | STRICTFP
    $.RULE("classOrInterfaceModifier", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.annotation);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Public);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Protected);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Private);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Static);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Abstract);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Final);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Strictfp);
          }
        }
      ]);
    });

    // annotation
    // : '@' qualifiedName ('(' ( elementValuePairs | elementValue )? ')')?
    $.RULE("annotation", () => {
      $.CONSUME(tokens.At);
      $.SUBRULE($.qualifiedName);
      $.OPTION(() => {
        $.CONSUME(tokens.LBrace);
        $.OPTION2(() => {
          $.OR([
            {
              ALT: () => {
                $.SUBRULE($.elementValuePairs);
              }
            },
            {
              ALT: () => {
                $.SUBRULE($.elementValue);
              }
            }
          ]);
        });
        $.CONSUME(tokens.RBrace);
      });
    });

    // elementValuePairs
    // : elementValuePair (',' elementValuePair)*
    $.RULE("elementValuePairs", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Comma,
        DEF: () => {
          $.SUBRULE($.elementValuePair);
        }
      });
    });

    // elementValuePair
    // : IDENTIFIER '=' elementValue
    $.RULE("elementValuePair", () => {
      $.CONSUME(tokens.Identifier);
      $.CONSUME(tokens.Equal);
      $.SUBRULE($.elementValue);
    });

    // elementValue
    // : expression
    // | annotation
    // | elementValueArrayInitializer
    $.RULE("elementValue", () => {
      $.OR([
        //     {
        //       ALT: () => {
        //         $.SUBRULE($.epxression);
        //       }
        //     },
        {
          ALT: () => {
            $.SUBRULE($.annotation);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.elementValueArrayInitializer);
          }
        }
      ]);
    });

    // elementValueArrayInitializer
    // : '{' (elementValue (',' elementValue)*)? (',')? '}'
    $.RULE("elementValueArrayInitializer", () => {
      $.CONSUME(tokens.LCurly);
      $.OPTION(() => {
        $.SUBRULE($.elementValue);
        $.MANY(() => {
          $.CONSUME(tokens.Comma);
          $.SUBRULE2($.elementValue);
        });
      });
      $.OPTION2(() => {
        $.CONSUME2(tokens.Comma);
      });
      $.CONSUME(tokens.RCurly);
    });

    // classDeclaration
    // : CLASS IDENTIFIER typeParameters?
    //   (EXTENDS typeType)?
    //   (IMPLEMENTS typeList)?
    //   classBody
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
    $.RULE("classBody", () => {
      $.CONSUME(tokens.LCurly);
      // $.MANY(() => {
      //   $.SUBRULE($.classBodyDeclaration);
      // });
      $.CONSUME(tokens.RCurly);
    });

    // enumDeclaration
    // : ENUM IDENTIFIER (IMPLEMENTS typeList)? '{' enumConstants? ','? enumBodyDeclarations? '}'
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

    // interfaceDeclaration
    // : INTERFACE IDENTIFIER typeParameters? (EXTENDS typeList)? interfaceBody
    $.RULE("interfaceDeclaration", () => {
      $.CONSUME(tokens.Interface);
      $.CONSUME(tokens.Identifier);
      // $.OPTION(() => {
      //   $.SUBRULE($.typeParameters);
      // });
      // $.OPTION2(() => {
      //   $.CONSUME(tokens.Extends);
      //   $.SUBRULE($.typeList);
      // });
      $.SUBRULE($.interfaceBody);
    });

    // interfaceBody
    // : '{' interfaceBodyDeclaration* '}'
    $.RULE("interfaceBody", () => {
      $.CONSUME(tokens.LCurly);
      // $.MANY(() => {
      //   $.SUBRULE($.interfaceBodyDeclaration);
      // });
      $.CONSUME(tokens.RCurly);
    });

    // annotationTypeDeclaration
    // : '@' INTERFACE IDENTIFIER annotationTypeBody
    $.RULE("annotationTypeDeclaration", () => {
      $.CONSUME(tokens.At);
      $.CONSUME(tokens.Interface);
      $.CONSUME(tokens.Identifier);
      $.SUBRULE($.annotationTypeBody);
    });

    // annotationTypeBody
    // : '{' (annotationTypeElementDeclaration)* '}'
    $.RULE("annotationTypeBody", () => {
      $.CONSUME(tokens.LCurly);
      // $.MANY(() => {
      //   $.SUBRULE($.annotationTypeElementDeclaration);
      // });
      $.CONSUME(tokens.RCurly);
    });

    // qualifiedName
    // : IDENTIFIER ('.' IDENTIFIER)*
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
