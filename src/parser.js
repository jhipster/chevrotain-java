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
        // TODO: refactoring
        // {
        //   ALT: () => {
        //     $.SUBRULE($.expression);
        //   }
        // },
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
      $.OPTION(() => {
        $.SUBRULE($.typeParameters);
      });
      $.OPTION2(() => {
        $.CONSUME(tokens.Extends);
        $.SUBRULE($.typeType);
      });
      $.OPTION3(() => {
        $.CONSUME(tokens.Implements);
        $.SUBRULE($.typeList);
      });
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
        // TODO: refactoring
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
        // TODO: refactoring
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
        // TODO: refactoring
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
        // TODO: refactoring
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
      $.SUBRULE($.variableInitializer);
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
      $.OPTION(() => {
        $.CONSUME(tokens.Equal);
        $.SUBRULE($.variableInitializer);
      });
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

    // variableInitializer
    // : arrayInitializer
    // | expression
    $.RULE("variableInitializer", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.arrayInitializer);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.expression);
          }
        }
      ]);
    });

    // arrayInitializer
    // : '{' (variableInitializer (',' variableInitializer)* (',')? )? '}'
    $.RULE("arrayInitializer", () => {
      $.CONSUME(tokens.LCurly);
      $.OPTION(() => {
        $.SUBRULE($.variableInitializer);
        $.MANY({
          GATE: function() {
            return (
              this.LA(2).tokenType !== tokens.Comma &&
              this.LA(2).tokenType !== tokens.RCurly
            );
          },
          DEF: function() {
            $.CONSUME(tokens.Comma);
            $.SUBRULE2($.variableInitializer);
          }
        });
      });
      $.OPTION2(() => {
        $.CONSUME2(tokens.Comma);
      });
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
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.annotationMethodRest);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.annotationConstantRest);
          }
        }
      ]);
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
    $.RULE("annotationConstantRest", () => {
      $.SUBRULE($.variableDeclarators);
    });

    // defaultValue
    // : DEFAULT elementValue
    $.RULE("defaultValue", () => {
      $.CONSUME(tokens.Default);
      $.SUBRULE($.elementValue);
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

    // identifiers
    // : '(' identifierList? ')'
    $.RULE("identifiers", () => {
      $.CONSUME(tokens.LBrace);
      $.OPTION(() => {
        $.SUBRULE($.identifierList);
      });
      $.CONSUME(tokens.RBrace);
    });

    // identifierList
    // : identifier (',' identifier)*
    $.RULE("identifierList", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Comma,
        DEF: () => {
          $.CONSUME(tokens.Identifier);
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

    // block
    // : '{' blockStatement* '}'
    $.RULE("block", () => {
      $.CONSUME(tokens.LCurly);
      // TODO: blockStatement needs refactoring
      // $.MANY({
      //   DEF: function() {
      //     $.SUBRULE($.blockStatement);
      //   }
      // });
      $.CONSUME(tokens.RCurly);
    });

    // blockStatement
    // : localVariableDeclaration ';'
    // | statement
    // | localTypeDeclaration
    // TODO: refactoring
    // $.RULE("blockStatement", () => {
    //   $.OR([
    //     {
    //       ALT: () => {
    //         $.SUBRULE($.statement);
    //       }
    //     },
    //     {
    //       ALT: () => {
    //         $.SUBRULE($.localVariableDeclaration);
    //       }
    //     },
    //     {
    //       ALT: () => {
    //         $.SUBRULE($.localTypeDeclaration);
    //       }
    //     }
    //   ]);
    // });

    // localVariableDeclaration
    // : variableModifier* typeType variableDeclarators
    $.RULE("localVariableDeclaration", () => {
      $.MANY(() => {
        $.SUBRULE($.variableModifier);
      });
      $.SUBRULE($.typeType);
      $.SUBRULE($.variableDeclarators);
    });

    // localTypeDeclaration
    // : classOrInterfaceModifier*
    //   (classDeclaration | interfaceDeclaration)
    $.RULE("localTypeDeclaration", () => {
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
            $.SUBRULE($.interfaceDeclaration);
          }
        }
      ]);
    });

    // statement
    // : block
    // | assertStatement
    // | ifStatement
    // | forStatement
    // | whileStatement
    // | doWhileStatement
    // | tryStatement
    // | switchStatement
    // | synchronizedStatement
    // | returnStatement
    // | throwStatement
    // | breakStatement
    // | continueStatement
    // | semiColonStatement
    // | expressionStatement
    // | identifierStatement
    $.RULE("statement", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.block);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.assertStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.ifStatement);
          }
        },
        // TODO: forControl needs refactoring
        // {
        //   ALT: () => {
        //     $.SUBRULE($.forStatement);
        //   }
        // },
        {
          ALT: () => {
            $.SUBRULE($.whileStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.doWhileStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.tryStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.switchStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.synchronizedStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.returnStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.throwStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.breakStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.continueStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.semiColonStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.expressionStatement);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.identifierStatement);
          }
        }
      ]);
    });

    // assertStatement
    // : ASSERT expression (':' expression)? ';'
    $.RULE("assertStatement", () => {
      $.CONSUME(tokens.Assert);
      $.SUBRULE($.expression);
      $.OPTION(() => {
        $.CONSUME(tokens.Colon);
        $.SUBRULE2($.expression);
      });
      $.CONSUME(tokens.SemiColon);
    });

    // ifStatement
    // : IF '(' expression ')' statement (ELSE statement)?
    $.RULE("ifStatement", () => {
      $.CONSUME(tokens.If);
      $.CONSUME(tokens.LBrace);
      $.SUBRULE($.expression);
      $.CONSUME(tokens.RBrace);
      $.SUBRULE($.statement);
      $.OPTION(() => {
        $.CONSUME(tokens.Else);
        $.SUBRULE2($.statement);
      });
    });

    // forStatement
    // : FOR '(' forControl ')' statement
    // TODO: forControl needs refactoring
    // $.RULE("forStatement", () => {
    //   $.CONSUME(tokens.For);
    //   $.CONSUME(tokens.LBrace);
    //   $.SUBRULE($.forControl);
    //   $.CONSUME(tokens.RBrace);
    //   $.SUBRULE($.statement);
    // });

    // whileStatement
    // : WHILE '(' expression ')' statement
    $.RULE("whileStatement", () => {
      $.CONSUME(tokens.While);
      $.CONSUME(tokens.LBrace);
      $.SUBRULE($.expression);
      $.CONSUME(tokens.RBrace);
      $.SUBRULE($.statement);
    });

    // doWhileStatement
    // : DO statement WHILE '(' expression ')' ';'
    $.RULE("doWhileStatement", () => {
      $.CONSUME(tokens.Do);
      $.SUBRULE($.statement);
      $.CONSUME(tokens.While);
      $.CONSUME(tokens.LBrace);
      $.SUBRULE($.expression);
      $.CONSUME(tokens.RBrace);
      $.CONSUME(tokens.SemiColon);
    });

    // tryStatement
    // : TRY resourceSpecification? block (catchClause+ finallyBlock? | finallyBlock)
    $.RULE("tryStatement", () => {
      $.CONSUME(tokens.Try);
      $.OPTION(() => {
        $.SUBRULE($.resourceSpecification);
      });
      $.SUBRULE($.block);
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.catchClause);
            $.MANY(() => {
              $.SUBRULE2($.catchClause);
            });
            $.OPTION2(() => {
              $.SUBRULE($.finallyBlock);
            });
          }
        },
        {
          ALT: () => {
            $.SUBRULE2($.finallyBlock);
          }
        }
      ]);
    });

    // switchStatement
    // : SWITCH '(' expression ')' '{' switchBlockStatementGroup* switchLabel* '}'
    $.RULE("switchStatement", () => {
      $.CONSUME(tokens.Switch);
      $.CONSUME(tokens.LBrace);
      $.SUBRULE($.expression);
      $.CONSUME(tokens.RBrace);
      $.CONSUME(tokens.LCurly);
      // $.MANY(() => {
      //   $.SUBRULE($.switchBlockStatementGroup);
      // });
      // $.MANY(() => {
      //   $.SUBRULE($.switchLabel);
      // });
      $.CONSUME(tokens.RCurly);
    });

    // synchronizedStatement
    // : SYNCHRONIZED '(' expression ')' block
    $.RULE("synchronizedStatement", () => {
      $.CONSUME(tokens.Synchronized);
      $.CONSUME(tokens.LBrace);
      $.SUBRULE($.expression);
      $.CONSUME(tokens.RBrace);
      $.SUBRULE($.block);
    });

    // returnStatement
    // : RETURN expression? ';'
    $.RULE("returnStatement", () => {
      $.CONSUME(tokens.Return);
      $.OPTION(() => {
        $.SUBRULE($.expression);
      });
      $.CONSUME(tokens.SemiColon);
    });

    // throwStatement
    // : THROW expression ';'
    $.RULE("throwStatement", () => {
      $.CONSUME(tokens.Throw);
      $.SUBRULE($.expression);
      $.CONSUME(tokens.SemiColon);
    });

    // breakStatement
    // : BREAK IDENTIFIER? ';'
    $.RULE("breakStatement", () => {
      $.CONSUME(tokens.Break);
      $.OPTION(() => {
        $.CONSUME(tokens.Identifier);
      });
      $.CONSUME(tokens.SemiColon);
    });

    // continueStatement
    // : CONTINUE IDENTIFIER? ';'
    $.RULE("continueStatement", () => {
      $.CONSUME(tokens.Continue);
      $.OPTION(() => {
        $.CONSUME(tokens.Identifier);
      });
      $.CONSUME(tokens.SemiColon);
    });

    // semiColonStatement
    // : ';'
    $.RULE("semiColonStatement", () => {
      $.CONSUME(tokens.SemiColon);
    });

    // expressionStatement
    // : expression ';'
    $.RULE("expressionStatement", () => {
      $.SUBRULE($.expression);
      $.CONSUME(tokens.SemiColon);
    });

    // identifierStatement
    // : IDENTIFIER ':' statement
    $.RULE("identifierStatement", () => {
      $.CONSUME(tokens.Identifier);
      $.CONSUME(tokens.Colon);
      $.SUBRULE($.statement);
    });

    // catchClause
    // : CATCH '(' variableModifier* catchType IDENTIFIER ')' block
    $.RULE("catchClause", () => {
      $.CONSUME(tokens.Catch);
      $.CONSUME(tokens.LBrace);
      $.MANY(() => {
        $.SUBRULE($.variableModifier);
      });
      $.SUBRULE($.catchType);
      $.CONSUME(tokens.Identifier);
      $.CONSUME(tokens.RBrace);
      $.SUBRULE($.block);
    });

    // catchType
    // : qualifiedName ('|' qualifiedName)*
    $.RULE("catchType", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.VerticalLine,
        DEF: () => {
          $.SUBRULE($.qualifiedName);
        }
      });
    });

    // finallyBlock
    // : FINALLY block
    $.RULE("finallyBlock", () => {
      $.CONSUME(tokens.Finally);
      $.SUBRULE($.block);
    });

    // resourceSpecification
    // : '(' resources ';'? ')'
    $.RULE("resourceSpecification", () => {
      $.CONSUME(tokens.LBrace);
      $.SUBRULE($.resources);
      $.OPTION(() => {
        $.CONSUME(tokens.SemiColon);
      });
      $.CONSUME(tokens.RBrace);
    });

    // resources
    // : resource (';' resource)*
    $.RULE("resources", () => {
      $.SUBRULE($.resource);
      $.MANY({
        GATE: function() {
          return this.LA(2).tokenType !== tokens.RBrace;
        },
        DEF: function() {
          $.CONSUME(tokens.SemiColon);
          $.SUBRULE2($.resource);
        }
      });
    });

    // resource
    // : variableModifier* classOrInterfaceType variableDeclaratorId '=' expression
    $.RULE("resource", () => {
      $.MANY(() => {
        $.SUBRULE($.variableModifier);
      });
      $.SUBRULE($.classOrInterfaceType);
      $.SUBRULE($.variableDeclaratorId);
      $.CONSUME(tokens.Equal);
      $.SUBRULE($.expression);
    });

    // /** Matches cases then statements, both of which are mandatory.
    //  *  To handle empty cases at the end, we add switchLabel* to statement.
    //  */
    // switchBlockStatementGroup
    // : switchLabel+ blockStatement+
    // $.RULE("switchBlockStatementGroup", () => {
    //   $.AT_LEAST_ONE_SEP({
    //     DEF: () => {
    //       $.SUBRULE($.switchLabel);
    //     }
    //   });
    //   $.AT_LEAST_ONE_SEP({
    //     DEF: () => {
    //       $.SUBRULE($.blockStatement);
    //     }
    //   });
    // });

    // switchLabel
    // : switchLabelCase
    // | switchLabelDefault
    $.RULE("switchLabel", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.switchLabelCase);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.switchLabelDefault);
          }
        }
      ]);
    });

    // switchLabelCase
    // : CASE (expression | IDENTIFIER) ':'
    $.RULE("switchLabelCase", () => {
      $.CONSUME(tokens.Case);
      // TODO: refactoring
      // $.OR([
      //   {
      //     ALT: () => {
      //       $.SUBRULE($.expression);
      //     }
      //   },
      //   {
      //     ALT: () => {
      $.CONSUME(tokens.Identifier);
      //     }
      //   }
      // ]);
      $.CONSUME(tokens.Colon);
    });

    // switchLabelDefault
    // : DEFAULT ':'
    $.RULE("switchLabelDefault", () => {
      $.CONSUME(tokens.Default);
      $.CONSUME(tokens.Colon);
    });

    // forControl
    // : enhancedForControl
    // | expressionForControl
    $.RULE("forControl", () => {
      // $.OR([
      //   {
      //     ALT: () => {
      $.SUBRULE($.enhancedForControl);
      //     }
      //   },
      //   {
      //     ALT: () => {
      //       $.SUBRULE($.expressionForControl);
      //     }
      //   }
      // ]);
    });

    // expressionForControl
    // : forInit? ';' expression? ';' forUpdate=expressionList?
    // $.RULE("forControl", () => {
    //   $.OPTION(() => {
    //     $.SUBRULE($.forInit);
    //   });
    //   $.CONSUME(tokens.SemiColon);
    //   $.OPTION(() => {
    //     $.SUBRULE($.expression);
    //   });
    //   $.CONSUME(tokens.SemiColon);
    //   $.OPTION(() => {
    //     $.SUBRULE($.expressionList);
    //   });
    // });

    // forInit
    // : localVariableDeclaration
    // | expressionList
    // TODO: refactoring
    // $.RULE("forInit", () => {
    //   $.OR([
    //     {
    //       ALT: () => {
    //         $.SUBRULE($.expressionList);
    //       }
    //     },
    //     {
    //       ALT: () => {
    //         $.SUBRULE($.localVariableDeclaration);
    //       }
    //     }
    //   ]);
    // });

    // enhancedForControl
    // : variableModifier* typeType variableDeclaratorId ':' expression
    $.RULE("enhancedForControl", () => {
      $.MANY(() => {
        $.SUBRULE($.variableModifier);
      });
      $.SUBRULE($.typeType);
      $.SUBRULE($.variableDeclaratorId);
      $.CONSUME(tokens.Colon);
      $.SUBRULE($.expression);
    });

    // explicitGenericInvocationSuffix
    // : super
    // | IDENTIFIER arguments
    $.RULE("explicitGenericInvocationSuffix", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.super);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.identifierArguments);
          }
        }
      ]);
    });

    // identifierArguments
    // : IDENTIFIER arguments
    $.RULE("identifierArguments", () => {
      $.CONSUME(tokens.Identifier);
      $.SUBRULE($.arguments);
    });

    // super
    // : SUPER superSuffix
    $.RULE("super", () => {
      $.CONSUME(tokens.Super);
      $.SUBRULE($.superSuffix);
    });

    // superSuffix
    // : arguments
    // | dotIdentifierArguments
    $.RULE("superSuffix", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.arguments);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.dotIdentifierArguments);
          }
        }
      ]);
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

    // dotIdentifierArguments
    // : '.' IDENTIFIER arguments?
    $.RULE("dotIdentifierArguments", () => {
      $.CONSUME(tokens.Dot);
      $.CONSUME(tokens.Identifier);
      $.OPTION(() => {
        $.SUBRULE($.arguments);
      });
    });

    // parExpression
    // : '(' expression ')'
    $.RULE("parExpression", () => {
      $.CONSUME(tokens.LBrace);
      $.SUBRULE($.expression);
      $.CONSUME(tokens.RBrace);
    });

    // expressionList
    // : expression (',' expression)*
    $.RULE("expressionList", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Comma,
        DEF: () => {
          $.SUBRULE($.expression);
        }
      });
    });

    // methodCall
    // : IDENTIFIER '(' expressionList? ')'
    $.RULE("methodCall", () => {
      $.CONSUME(tokens.Identifier);
      $.CONSUME(tokens.LBrace);
      $.OPTION(() => {
        $.SUBRULE($.expressionList);
      });
      $.CONSUME(tokens.RBrace);
    });

    // expression
    // : methodCall
    // | primary
    // | creator
    //
    // | expression bop='.'
    //   (IDENTIFIER
    //   | methodCall
    //   | THIS
    //   | NEW nonWildcardTypeArguments? innerCreator
    //   | super
    //   | explicitGenericInvocation
    //   )
    // | expression '[' expression ']'
    // | '(' typeType ')' expression
    // | expression postfix=('++' | '--')
    // | prefix=('+'|'-'|'++'|'--') expression
    // | prefix=('~'|'!') expression
    // | expression bop=('*'|'/'|'%') expression
    // | expression bop=('+'|'-') expression
    // | expression ('<' '<' | '>' '>' '>' | '>' '>') expression
    // | expression bop=('<=' | '>=' | '>' | '<') expression
    // | expression bop=INSTANCEOF typeType
    // | expression bop=('==' | '!=') expression
    // | expression bop='&' expression
    // | expression bop='^' expression
    // | expression bop='|' expression
    // | expression bop='&&' expression
    // | expression bop='||' expression
    // | expression bop='?' expression ':' expression
    // | <assoc=right> expression
    //   bop=('=' | '+=' | '-=' | '*=' | '/=' | '&=' | '|=' | '^=' | '>>=' | '>>>=' | '<<=' | '%=')
    //   expression
    // | lambdaExpression // Java8
    // TODO: refactoring
    $.RULE("expression", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.methodCall);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.primary);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.creator);
          }
        }
      ]);
    });

    // // Java 8 methodReference
    // : ( expression | typeType | classType ) '::' typeArguments? (IDENTIFIER | NEW)
    // TODO: refactoring
    // $.RULE("methodReference", () => {
    //   $.OR([
    //     {
    //       ALT: () => {
    //         $.SUBRULE($.typeType);
    //       }
    //     },
    //     {
    //       ALT: () => {
    //         $.SUBRULE($.classType);
    //       }
    //     }
    //     ,
    //     {
    //       ALT: () => {
    //         $.SUBRULE($.expression);
    //       }
    //     }
    //   ]);
    //   $.CONSUME(tokens.ColonColon);
    //   $.OPTION(() => {
    //     $.SUBRULE($.typeArguments);
    //   });
    //   $.OR2([
    //     {
    //       ALT: () => {
    //         $.CONSUME(tokens.Identifier);
    //       }
    //     },
    //     {
    //       ALT: () => {
    //         $.CONSUME(tokens.New);
    //       }
    //     }
    //   ]);
    // });

    // // Java8
    // lambdaExpression
    // : lambdaParameters '->' lambdaBody
    $.RULE("lambdaExpression", () => {
      $.SUBRULE($.lambdaParameters);
      $.CONSUME(tokens.Pointer);
      $.SUBRULE($.lambdaBody);
    });

    // // Java8
    // lambdaParameters
    // : IDENTIFIER
    // | formalParameters
    // | identifiers
    $.RULE("lambdaParameters", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(tokens.Identifier);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.LBrace);
            $.CONSUME(tokens.RBrace);
          }
        },
        {
          ALT: () => {
            $.CONSUME2(tokens.LBrace);
            $.SUBRULE($.formalParameterList);
            $.CONSUME2(tokens.RBrace);
          }
        },
        {
          ALT: () => {
            $.CONSUME3(tokens.LBrace);
            $.SUBRULE($.identifierList);
            $.CONSUME3(tokens.RBrace);
          }
        }
      ]);
    });

    // // Java8
    // lambdaBody
    // : expression
    // | block
    $.RULE("lambdaBody", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.expression);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.block);
          }
        }
      ]);
    });

    // classType
    // : annotation* classOrInterfaceType
    $.RULE("classType", () => {
      $.MANY(() => {
        $.SUBRULE($.annotation);
      });
      $.SUBRULE($.classOrInterfaceType);
    });

    // creator
    // : nonWildcardCreator
    // | simpleCreator
    $.RULE("creator", () => {
      $.CONSUME(tokens.New);
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.nonWildcardCreator);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.simpleCreator);
          }
        }
      ]);
    });

    // nonWildCardCreator
    // : nonWildcardTypeArguments createdName classCreatorRest
    $.RULE("nonWildcardCreator", () => {
      $.SUBRULE($.nonWildcardTypeArguments);
      $.SUBRULE($.createdName);
      $.SUBRULE($.classCreatorRest);
    });

    // simpleCreator
    // : createdName (arrayCreatorRest | classCreatorRest)
    $.RULE("simpleCreator", () => {
      $.SUBRULE($.createdName);
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.arrayCreatorRest);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.classCreatorRest);
          }
        }
      ]);
    });

    // createdName
    // : identifierName
    // | primitiveType
    $.RULE("createdName", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.identifierName);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.primitiveType);
          }
        }
      ]);
    });

    // identifierName
    // : identifierNameElement ('.' identifierNameElement)*
    $.RULE("identifierName", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.Dot,
        DEF: () => {
          $.SUBRULE($.identifierNameElement);
        }
      });
    });

    // identifierNameElement
    // : IDENTIFIER typeArgumentsOrDiamond?
    $.RULE("identifierNameElement", () => {
      $.CONSUME(tokens.Identifier);
      $.OPTION(() => {
        $.SUBRULE($.nonWildcardTypeArgumentsOrDiamond);
      });
    });

    // innerCreator
    // : IDENTIFIER nonWildcardTypeArgumentsOrDiamond? classCreatorRest
    $.RULE("innerCreator", () => {
      $.CONSUME(tokens.Identifier);
      $.OPTION(() => {
        $.SUBRULE($.nonWildcardTypeArgumentsOrDiamond);
      });
      $.SUBRULE($.classCreatorRest);
    });

    // arrayCreatorRest
    // : '[' (']' ('[' ']')* arrayInitializer | expression ']' ('[' expression ']')* ('[' ']')*)
    $.RULE("arrayCreatorRest", () => {
      $.CONSUME(tokens.LSquare);
      $.OR([
        {
          ALT: () => {
            $.CONSUME(tokens.RSquare);
            $.MANY({
              DEF: function() {
                $.CONSUME2(tokens.LSquare);
                $.CONSUME2(tokens.RSquare);
              }
            });
            $.SUBRULE($.arrayInitializer);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.expression);
            $.CONSUME3(tokens.RSquare);
            $.MANY2({
              DEF: function() {
                $.CONSUME4(tokens.LSquare);
                $.SUBRULE2($.expression);
                $.CONSUME4(tokens.RSquare);
              }
            });
            $.MANY3({
              DEF: function() {
                $.CONSUME5(tokens.LSquare);
                $.CONSUME5(tokens.RSquare);
              }
            });
          }
        }
      ]);
    });

    // classCreatorRest
    // : arguments classBody?
    $.RULE("classCreatorRest", () => {
      $.SUBRULE($.arguments);
      $.OPTION(() => {
        $.SUBRULE($.classBody);
      });
    });

    // explicitGenericInvocation
    // : nonWildcardTypeArguments explicitGenericInvocationSuffix
    $.RULE("explicitGenericInvocation", () => {
      $.SUBRULE($.nonWildcardTypeArguments);
      $.SUBRULE($.explicitGenericInvocationSuffix);
    });

    // typeArgumentsOrDiamond
    // : emptyDiamond
    // | typeArguments
    $.RULE("typeArgumentsOrDiamond", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.emptyDiamond);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.typeArguments);
          }
        }
      ]);
    });

    // nonWildcardTypeArgumentsOrDiamond
    // : emptyDiamond
    // | nonWildcardTypeArguments
    $.RULE("nonWildcardTypeArgumentsOrDiamond", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.emptyDiamond);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.nonWildcardTypeArguments);
          }
        }
      ]);
    });

    // emptyDiamond
    // : '<' '>'
    $.RULE("emptyDiamond", () => {
      $.CONSUME(tokens.Less);
      $.CONSUME(tokens.Greater);
    });

    // nonWildcardTypeArguments
    // : '<' typeList '>'
    $.RULE("nonWildcardTypeArguments", () => {
      $.CONSUME(tokens.Less);
      $.SUBRULE($.typeList);
      $.CONSUME(tokens.Greater);
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

    // primary
    // : parExpression
    // | THIS
    // | SUPER
    // | literal
    // | IDENTIFIER
    // | typeTypeOrVoid '.' CLASS
    // | nonWildcardTypeArguments (explicitGenericInvocationSuffix | THIS arguments)
    $.RULE("primary", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.parExpression);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.This);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Super);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.literal);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.typeTypeOrVoid);
            $.CONSUME(tokens.Dot);
            $.CONSUME(tokens.Class);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Identifier);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.nonWildcardTypeArguments);
            $.OR2([
              {
                ALT: () => {
                  $.SUBRULE($.explicitGenericInvocationSuffix);
                }
              },
              {
                ALT: () => {
                  $.CONSUME2(tokens.This);
                  $.SUBRULE($.arguments);
                }
              }
            ]);
          }
        }
      ]);
    });

    // literal
    // : integerLiteral
    // | floatLiteral
    // | CHAR_LITERAL
    // | STRING_LITERAL
    // | BOOL_LITERAL
    // | NULL_LITERAL
    $.RULE("literal", () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.integerLiteral);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.floatLiteral);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.CharLiteral);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.StringLiteral);
          }
        },
        {
          ALT: () => {
            $.SUBRULE($.booleanLiteral);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.Null);
          }
        }
      ]);
    });

    // booleanLiteral
    // : TRUE
    // | FALSE
    $.RULE("booleanLiteral", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(tokens.True);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.False);
          }
        }
      ]);
    });

    // integerLiteral
    // : DECIMAL_LITERAL
    // | HEX_LITERAL
    // | OCT_LITERAL
    // | BINARY_LITERAL
    $.RULE("integerLiteral", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(tokens.DecimalLiteral);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.HexLiteral);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.OctLiteral);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.BinaryLiteral);
          }
        }
      ]);
    });

    // floatLiteral
    // : FLOAT_LITERAL
    // | HEX_FLOAT_LITERAL
    $.RULE("floatLiteral", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(tokens.FloatLiteral);
          }
        },
        {
          ALT: () => {
            $.CONSUME(tokens.HexFloatLiteral);
          }
        }
      ]);
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

    Parser.performSelfAnalysis(this);
  }
}

module.exports = SelectParser;
