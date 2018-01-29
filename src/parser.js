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

    // modifier
    // : classOrInterfaceModifier
    // | NATIVE
    // | SYNCHRONIZED
    // | TRANSIENT
    // | VOLATILE
    $.RULE("modifier", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.classOrInterfaceModifier);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Native);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Synchronized);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Transient);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Volatile);
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

    // variableModifier
    // : FINAL
    // | annotation
    $.RULE("variableModifier", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.annotation);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Final);
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

    // typeParameters
    // : '<' typeParameter (',' typeParameter)* '>'
    $.RULE("typeParameters", () => {
      $.CONSUME(tokens.Less);
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Comma,
        DEF: () => {
          $.SUBRULE($.typeParameter);
        }
      });
      $.CONSUME(tokens.Greater);
    });

    // typeParameter
    // : annotation* IDENTIFIER (EXTENDS typeBound)?
    $.RULE("typeParameter", () => {
      $.MANY(() => {
        $.SUBRULE($.annotation);
      });
      $.CONSUME(tokens.Identifier);
      $.OPTION(() => {
        $.CONSUME(tokens.Extends);
        $.SUBRULE($.typeBound);
      });
    });

    // typeBound
    // : typeType ('&' typeType)*
    $.RULE("typeBound", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.And,
        DEF: () => {
          $.SUBRULE($.typeType);
        }
      });
    });

    // classBody
    // : '{' classBodyDeclaration* '}'
    $.RULE("classBody", () => {
      $.CONSUME(tokens.LCurly);
      $.MANY(() => {
        $.SUBRULE($.classBodyDeclaration);
      });
      $.CONSUME(tokens.RCurly);
    });

    // classBodyDeclaration
    // : STATIC? block
    // | modifier* memberDeclaration
    $.RULE("classBodyDeclaration", () => {
      $.OR([
        {
          // classBodyBlock
          ALT: () => {
            $.OPTION(() => {
              $.CONSUME(tokens.Static);
            });
            $.SUBRULE($.block);
          }
        },
        {
          // classBodyMemberDeclaration
          ALT: () => {
            $.MANY({
              DEF: function() {
                $.SUBRULE($.modifier);
              }
            });
            $.SUBRULE($.memberDeclaration);
          }
        }
      ]);
    });

    // memberDeclaration
    // : methodDeclaration
    // | genericMethodDeclaration
    // | fieldDeclaration
    // | constructorDeclaration
    // | genericConstructorDeclaration
    // | interfaceDeclaration
    // | annotationTypeDeclaration
    // | classDeclaration
    // | enumDeclaration
    $.RULE("memberDeclaration", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.methodDeclaration);
          }
        },
        // {
        //   ALT: () => {
        //     $.SUBRULE($.genericMethodDeclaration);
        //   }
        // },
        // {
        //   ALT: () => {
        //     $.SUBRULE($.fieldDeclaration);
        //   }
        // },
        {
          ALT: () => {
            $.SUBRULE($.constructorDeclaration);
          }
        },
        // {
        //   ALT: () => {
        //     $.SUBRULE($.genericConstructorDeclaration);
        //   }
        // },
        {
          ALT: () => {
            $.SUBRULE($.interfaceDeclaration);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.annotationTypeDeclaration);
          }
        },
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
      ]);
    });

    /* We use rule this even for void methods which cannot have [] after parameters.
      This simplifies grammar and we can consider void to be a type, which
      renders the [] matching as a context-sensitive issue or a semantic check
      for invalid return type after parsing.
    */
    // methodDeclaration
    // : typeTypeOrVoid IDENTIFIER formalParameters ('[' ']')*
    //   (THROWS qualifiedNameList)?
    //   methodBody
    $.RULE("methodDeclaration", () => {
      $.SUBRULE($.typeTypeOrVoid);
      $.CONSUME(tokens.Identifier);
      $.SUBRULE($.formalParameters);
      $.MANY({
        DEF: function() {
          $.CONSUME(tokens.LSquare);
          $.CONSUME(tokens.RSquare);
        }
      });
      $.OPTION(() => {
        $.CONSUME(tokens.Throws);
        $.SUBRULE($.qualifiedNameList);
      });
      $.SUBRULE($.methodBody);
    });

    // genericMethodDeclaration
    // : typeParameters methodDeclaration
    $.RULE("genericMethodDeclaration", () => {
      $.SUBRULE($.typeParameters);
      $.SUBRULE($.methodDeclaration);
    });

    // constructorDeclaration
    // : IDENTIFIER formalParameters (THROWS qualifiedNameList)? block
    $.RULE("constructorDeclaration", () => {
      $.CONSUME(tokens.Identifier);
      $.SUBRULE($.formalParameters);
      $.OPTION(() => {
        $.CONSUME(tokens.Throws);
        $.SUBRULE($.qualifiedNameList);
      });
      $.SUBRULE($.methodBody);
    });

    // genericConstructorDeclaration
    // : typeParameters constructorDeclaration
    $.RULE("genericConstructorDeclaration", () => {
      $.SUBRULE($.typeParameters);
      $.SUBRULE($.constructorDeclaration);
    });

    // fieldDeclaration
    // : typeType variableDeclarators ';'
    $.RULE("fieldDeclaration", () => {
      $.SUBRULE($.typeType);
      $.SUBRULE($.variableDeclarators);
      $.CONSUME(tokens.SemiColon);
    });

    // methodBody
    // : block
    $.RULE("methodBody", () => {
      $.SUBRULE($.block);
    });

    // enumDeclaration
    // : ENUM IDENTIFIER (IMPLEMENTS typeList)? '{' enumConstants? ','? enumBodyDeclarations? '}'
    $.RULE("enumDeclaration", () => {
      $.CONSUME(tokens.Enum);
      $.CONSUME(tokens.Identifier);
      $.OPTION(() => {
        $.CONSUME(tokens.Implements);
        $.SUBRULE($.typeList);
      });
      $.CONSUME(tokens.LCurly);
      $.OPTION2(() => {
        $.SUBRULE($.enumConstants);
      });
      $.OPTION3(() => {
        $.CONSUME(tokens.Comma);
      });
      $.OPTION4(() => {
        $.SUBRULE($.enumBodyDeclarations);
      });
      $.CONSUME(tokens.RCurly);
    });

    // enumConstants
    // : enumConstant (',' enumConstant)*
    $.RULE("enumConstants", () => {
      $.SUBRULE($.enumConstant);
      $.MANY({
        // It can have a single comma at the end
        // What should follow is a right curly OR
        // a semi colon for a start of a enumBodyDeclarations
        GATE: function() {
          return (
            this.LA(2).tokenType !== tokens.RCurly &&
            this.LA(2).tokenType !== tokens.SemiColon
          );
        },
        DEF: function() {
          $.CONSUME(tokens.Comma);
          $.SUBRULE2($.enumConstant);
        }
      });
    });

    // enumConstant
    // : annotation* IDENTIFIER arguments? classBody?
    $.RULE("enumConstant", () => {
      $.MANY({
        DEF: function() {
          $.SUBRULE($.annotation);
        }
      });
      $.CONSUME(tokens.Identifier);
      $.OPTION(() => {
        $.SUBRULE($.arguments);
      });
      $.OPTION2(() => {
        $.SUBRULE($.classBody);
      });
    });

    // enumBodyDeclarations
    // : ';' classBodyDeclaration*
    $.RULE("enumBodyDeclarations", () => {
      $.CONSUME(tokens.SemiColon);
      $.MANY({
        DEF: function() {
          $.SUBRULE($.classBodyDeclaration);
        }
      });
    });

    // interfaceDeclaration
    // : INTERFACE IDENTIFIER typeParameters? (EXTENDS typeList)? interfaceBody
    $.RULE("interfaceDeclaration", () => {
      $.CONSUME(tokens.Interface);
      $.CONSUME(tokens.Identifier);
      $.OPTION(() => {
        $.SUBRULE($.typeParameters);
      });
      $.OPTION2(() => {
        $.CONSUME(tokens.Extends);
        $.SUBRULE($.typeList);
      });
      $.SUBRULE($.interfaceBody);
    });

    // interfaceBody
    // : '{' interfaceBodyDeclaration* '}'
    $.RULE("interfaceBody", () => {
      $.CONSUME(tokens.LCurly);
      $.MANY(() => {
        $.SUBRULE($.interfaceBodyDeclaration);
      });
      $.CONSUME(tokens.RCurly);
    });

    // interfaceBodyDeclaration
    // : modifier* interfaceMemberDeclaration
    $.RULE("interfaceBodyDeclaration", () => {
      $.MANY({
        DEF: function() {
          $.SUBRULE($.modifier);
        }
      });
      $.SUBRULE($.interfaceMemberDeclaration);
    });

    // interfaceMemberDeclaration
    // : constantDeclaration
    // | interfaceMethodDeclaration
    // | genericInterfaceMethodDeclaration
    // | interfaceDeclaration
    // | annotationTypeDeclaration
    // | classDeclaration
    // | enumDeclaration
    $.RULE("interfaceMemberDeclaration", () => {
      $.OR([
        // {
        //   ALT: () => {
        //     $.SUBRULE($.constantDeclaration);
        //   }
        // },
        {
          ALT: () => {
            $.SUBRULE($.interfaceMethodDeclaration);
          }
        },
        // {
        //   ALT: () => {
        //     $.SUBRULE($.genericInterfaceMethodDeclaration);
        //   }
        // },
        {
          ALT: () => {
            $.SUBRULE($.interfaceDeclaration);
          }
        },
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
      ]);
    });

    // constantDeclaration
    // : typeType constantDeclarator (',' constantDeclarator)* ';'
    $.RULE("constantDeclaration", () => {
      $.SUBRULE($.typeType);
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Comma,
        DEF: () => {
          $.SUBRULE($.constantDeclarator);
        }
      });
      $.CONSUME(tokens.SemiColon);
    });

    // constantDeclarator
    // : IDENTIFIER ('[' ']')* '=' variableInitializer
    $.RULE("constantDeclarator", () => {
      $.CONSUME(tokens.Identifier);
      $.MANY({
        DEF: function() {
          $.CONSUME(tokens.LSquare);
          $.CONSUME(tokens.RSquare);
        }
      });
      $.CONSUME(tokens.Equal);
      // $.SUBRULE($.variableInitializer);
    });

    // see matching of [] comment in methodDeclaratorRest
    // methodBody from Java8
    // interfaceMethodDeclaration
    // : interfaceMethodModifier*
    //   (typeParameters annotation*)?
    //   typeTypeOrVoid
    //   IDENTIFIER formalParameters ('[' ']')*
    //   (THROWS qualifiedNameList)?
    //   methodBody
    $.RULE("interfaceMethodDeclaration", () => {
      $.MANY({
        DEF: function() {
          $.SUBRULE($.interfaceMethodModifier);
        }
      });
      $.OPTION(() => {
        $.SUBRULE($.typeParameters);
      });
      $.MANY2({
        DEF: function() {
          $.SUBRULE($.annotation);
        }
      });
      $.SUBRULE($.typeTypeOrVoid);
      $.CONSUME(tokens.Identifier);
      $.SUBRULE($.formalParameters);
      $.MANY3({
        DEF: function() {
          $.CONSUME(tokens.LSquare);
          $.CONSUME(tokens.RSquare);
        }
      });
      $.OPTION2(() => {
        $.CONSUME(tokens.Throws);
        $.SUBRULE($.qualifiedNameList);
      });
      $.SUBRULE($.methodBody);
    });

    // genericInterfaceMethodDeclaration
    // : typeParameters interfaceMethodDeclaration
    $.RULE("genericInterfaceMethodDeclaration", () => {
      $.SUBRULE($.typeParameters);
      $.SUBRULE($.interfaceMethodDeclaration);
    });

    // // Java8
    // interfaceMethodModifier
    // : annotation
    // | PUBLIC
    // | ABSTRACT
    // | DEFAULT
    // | STATIC
    // | STRICTFP
    $.RULE("interfaceMethodModifier", () => {
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
            $.CONSUME(tokens.Abstract);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Default);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Static);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Strictfp);
          }
        }
      ]);
    });

    // genericInterfaceMethodDeclaration
    // : typeParameters interfaceMethodDeclaration

    // variableDeclarators
    // : variableDeclarator (',' variableDeclarator)*
    $.RULE("variableDeclarators", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Comma,
        DEF: () => {
          $.SUBRULE($.variableDeclarator);
        }
      });
    });

    // variableDeclarator
    // : variableDeclaratorId ('=' variableInitializer)?
    $.RULE("variableDeclarator", () => {
      $.SUBRULE($.variableDeclaratorId);
      // $.OPTION(() => {
      //   $.CONSUME(tokens.Equal);
      //   $.SUBRULE($.variableInitializer);
      // });
    });

    // variableDeclaratorId
    // : IDENTIFIER ('[' ']')*
    $.RULE("variableDeclaratorId", () => {
      $.CONSUME(tokens.Identifier);
      $.MANY({
        DEF: function() {
          $.CONSUME(tokens.LSquare);
          $.CONSUME(tokens.RSquare);
        }
      });
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
      $.MANY(() => {
        $.SUBRULE($.annotationTypeElementDeclaration);
      });
      $.CONSUME(tokens.RCurly);
    });

    // annotationTypeElementDeclaration
    // : modifier* annotationTypeElementRest
    $.RULE("annotationTypeElementDeclaration", () => {
      $.MANY(() => {
        $.SUBRULE($.modifier);
      });
      $.SUBRULE($.annotationTypeElementRest);
    });

    // annotationTypeElementRest
    // : typeType annotationMethodRestOrConstantRest ';'
    // | classDeclaration ';'?
    // | interfaceDeclaration ';'?
    // | enumDeclaration ';'?
    // | annotationTypeDeclaration ';'?
    $.RULE("annotationTypeElementRest", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.typeType);
            $.SUBRULE($.annotationMethodRestOrConstantRest);
            $.CONSUME(tokens.SemiColon);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.classDeclaration);
            $.OPTION(() => {
              $.CONSUME2(tokens.SemiColon);
            });
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.interfaceDeclaration);
            $.OPTION2(() => {
              $.CONSUME3(tokens.SemiColon);
            });
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.enumDeclaration);
            $.OPTION3(() => {
              $.CONSUME4(tokens.SemiColon);
            });
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.annotationTypeDeclaration);
            $.OPTION4(() => {
              $.CONSUME5(tokens.SemiColon);
            });
          }
        }
      ]);
    });

    // annotationMethodRestOrConstantRest
    // : annotationMethodRest
    // | annotationConstantRest
    $.RULE("annotationMethodRestOrConstantRest", () => {
      // $.OR([
      //   {
      //     ALT: () => {
      $.SUBRULE($.annotationMethodRest);
      //     }
      //   },
      //   {
      //     ALT: () => {
      //       $.SUBRULE($.annotationConstantRest);
      //     }
      //   }
      // ]);
    });

    // annotationMethodRest
    // : IDENTIFIER '(' ')' defaultValue?
    $.RULE("annotationMethodRest", () => {
      $.CONSUME(tokens.Identifier);
      $.CONSUME(tokens.LBrace);
      $.CONSUME(tokens.RBrace);
      $.OPTION(() => {
        $.SUBRULE($.defaultValue);
      });
    });

    // annotationConstantRest
    // : variableDeclarators

    // defaultValue
    // : DEFAULT elementValue
    $.RULE("defaultValue", () => {
      $.CONSUME(tokens.Default);
      $.SUBRULE($.elementValue);
    });

    // block
    // : '{' blockStatement* '}'
    $.RULE("block", () => {
      $.CONSUME(tokens.LCurly);
      // $.MANY({
      //   DEF: function() {
      //     $.SUBRULE($.blockStatement);
      //   }
      // });
      $.CONSUME(tokens.RCurly);
    });

    // typeList
    // : typeType (',' typeType)*
    $.RULE("typeList", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Comma,
        DEF: () => {
          $.SUBRULE($.typeType);
        }
      });
    });

    // typeType
    // : annotation? (classOrInterfaceType | primitiveType) ('[' ']')*
    $.RULE("typeType", () => {
      $.OPTION(() => {
        $.SUBRULE($.annotation);
      });
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.classOrInterfaceType);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.primitiveType);
          }
        }
      ]);
      $.MANY({
        DEF: function() {
          $.CONSUME(tokens.LSquare);
          $.CONSUME(tokens.RSquare);
        }
      });
    });

    // typeTypeOrVoid
    // : typeType | VOID
    $.RULE("typeTypeOrVoid", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.typeType);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Void);
          }
        }
      ]);
    });

    // classOrInterfaceType
    // : classOrInterfaceTypeElement ('.' classOrInterfaceTypeElement)*
    $.RULE("classOrInterfaceType", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Dot,
        DEF: () => {
          $.SUBRULE($.classOrInterfaceTypeElement);
        }
      });
    });

    // classOrInterfaceTypeElement
    // : IDENTIFIER typeArguments?
    $.RULE("classOrInterfaceTypeElement", () => {
      $.CONSUME(tokens.Identifier);
      $.OPTION(() => {
        $.SUBRULE($.typeArguments);
      });
    });

    // typeArguments
    // : '<' typeArgument (',' typeArgument)* '>'
    // ;
    $.RULE("typeArguments", () => {
      $.CONSUME(tokens.Less);
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Comma,
        DEF: () => {
          $.SUBRULE($.typeArgument);
        }
      });
      $.CONSUME(tokens.Greater);
    });

    // typeArgument
    // : typeType | '?'
    //   ((EXTENDS | SUPER) typeType)?
    $.RULE("typeArgument", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.typeType);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Questionmark);
          }
        }
      ]);
      $.OPTION(() => {
        $.OR2([
          {
            ALT: () => {
              $.CONSUME(tokens.Extends);
            }
          },
          {
            ALT: () => {
              $.CONSUME(tokens.Super);
            }
          }
        ]);
        $.SUBRULE2($.typeType);
      });
    });

    // qualifiedNameList
    // : qualifiedName (',' qualifiedName)*
    $.RULE("qualifiedNameList", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Comma,
        DEF: () => {
          $.SUBRULE($.qualifiedName);
        }
      });
    });

    // formalParameters
    // : '(' formalParameterList? ')'
    $.RULE("formalParameters", () => {
      $.CONSUME(tokens.LBrace);
      $.OPTION(() => {
        $.SUBRULE($.formalParameterList);
      });
      $.CONSUME(tokens.RBrace);
    });

    // formalParameterList
    // : formalParameter (',' formalParameter)*
    $.RULE("formalParameterList", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Comma,
        DEF: () => {
          $.SUBRULE($.formalParameter);
        }
      });
    });

    // formalParameter
    // : variableModifier* typeType DOTDOTDOT? variableDeclaratorId
    $.RULE("formalParameter", () => {
      $.MANY(() => {
        $.SUBRULE($.variableModifier);
      });
      $.SUBRULE($.typeType);
      $.OPTION(() => {
        $.CONSUME(tokens.DotDotDot);
      });
      $.SUBRULE($.variableDeclaratorId);
    });

    // primitiveType
    // : BOOLEAN
    // | CHAR
    // | BYTE
    // | SHORT
    // | INT
    // | LONG
    // | FLOAT
    // | DOUBLE
    $.RULE("primitiveType", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(tokens.Boolean);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Char);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Byte);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Short);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Int);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Long);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Float);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Double);
          }
        }
      ]);
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

    // arguments
    // : '(' expressionList? ')'
    $.RULE("arguments", () => {
      $.CONSUME(tokens.LBrace);
      // $.OPTION(() => {
      //   $.SUBRULE($.expressionList);
      // });
      $.CONSUME(tokens.RBrace);
    });

    Parser.performSelfAnalysis(this);
  }
}

module.exports = SelectParser;
