"use strict";
const chevrotain = require("chevrotain");

const createToken = chevrotain.createToken;

const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ });

function createKeywordToken(options) {
  options.longer_alt = Identifier;
  return createToken(options);
}

const Package = createKeywordToken({
  name: "Package",
  pattern: /package/,
  label: "'package'"
});

const Default = createKeywordToken({
  name: "Default",
  pattern: /default/,
  label: "'default'"
});

const Import = createKeywordToken({
  name: "Import",
  pattern: /import/,
  label: "'import'"
});

const Boolean = createKeywordToken({
  name: "Boolean",
  pattern: /boolean/,
  label: "'boolean'"
});

const Char = createKeywordToken({
  name: "Char",
  pattern: /char/,
  label: "'char'"
});

const Byte = createKeywordToken({
  name: "Byte",
  pattern: /byte/,
  label: "'byte'"
});

const Short = createKeywordToken({
  name: "Short",
  pattern: /short/,
  label: "'short'"
});

const Int = createKeywordToken({
  name: "Int",
  pattern: /int/,
  label: "'int'"
});

const Long = createKeywordToken({
  name: "Long",
  pattern: /long/,
  label: "'long'"
});

const Float = createKeywordToken({
  name: "Float",
  pattern: /float/,
  label: "'float'"
});

const Double = createKeywordToken({
  name: "Double",
  pattern: /double/,
  label: "'double'"
});

const Void = createKeywordToken({
  name: "Void",
  pattern: /void/,
  label: "'void'"
});

const Public = createKeywordToken({
  name: "Public",
  pattern: /public/,
  label: "'public'"
});

const Protected = createKeywordToken({
  name: "Protected",
  pattern: /protected/,
  label: "'protected'"
});

const Private = createKeywordToken({
  name: "Private",
  pattern: /private/,
  label: "'private'"
});

const Static = createKeywordToken({
  name: "Static",
  pattern: /static/,
  label: "'static'"
});

const Abstract = createKeywordToken({
  name: "Abstract",
  pattern: /abstract/,
  label: "'abstract'"
});

const Final = createKeywordToken({
  name: "Final",
  pattern: /final/,
  label: "'final'"
});

const Native = createKeywordToken({
  name: "Native",
  pattern: /native/,
  label: "'native'"
});

const Synchronized = createKeywordToken({
  name: "Synchronized",
  pattern: /synchronized/,
  label: "'synchronized'"
});

const Transient = createKeywordToken({
  name: "Transient",
  pattern: /transient/,
  label: "'transient'"
});

const Extends = createKeywordToken({
  name: "Extends",
  pattern: /extends/,
  label: "'extends'"
});

const Implements = createKeywordToken({
  name: "Implements",
  pattern: /implements/,
  label: "'implements'"
});

const Super = createKeywordToken({
  name: "Super",
  pattern: /super/,
  label: "'super'"
});

const Throws = createKeywordToken({
  name: "Throws",
  pattern: /throws/,
  label: "'throws'"
});

const Volatile = createKeywordToken({
  name: "Volatile",
  pattern: /volatile/,
  label: "'volatile'"
});

const Strictfp = createKeywordToken({
  name: "Strictfp",
  pattern: /strictfp/,
  label: "'strictfp'"
});

const Class = createKeywordToken({
  name: "Class",
  pattern: /class/,
  label: "'class'"
});

const Enum = createKeywordToken({
  name: "Enum",
  pattern: /enum/,
  label: "'enum'"
});

const Interface = createKeywordToken({
  name: "Interface",
  pattern: /interface/,
  label: "'interface'"
});

const LBrace = createToken({
  name: "LBrace",
  pattern: /\(/,
  label: "'('"
});

const RBrace = createToken({
  name: "RBrace",
  pattern: /\)/,
  label: "')'"
});

const LCurly = createToken({
  name: "LCurly",
  pattern: /{/,
  label: "'{'"
});

const RCurly = createToken({
  name: "RCurly",
  pattern: /}/,
  label: "'}'"
});

const LSquare = createToken({
  name: "LSquare",
  pattern: /\[/,
  label: "'['"
});

const RSquare = createToken({
  name: "RSquare",
  pattern: /]/,
  label: "']'"
});

const Less = createToken({
  name: "Less",
  pattern: /</,
  label: "'<'"
});

const Greater = createToken({
  name: "Greater",
  pattern: />/,
  label: "'>'"
});

const DotDotDot = createToken({
  name: "DotDotDot",
  pattern: /\.\.\./,
  label: "'...'"
});

const Dot = createToken({
  name: "Dot",
  pattern: /\./,
  label: "'.'"
});

const Comma = createToken({
  name: "Comma",
  pattern: /,/,
  label: "','"
});

const SemiColon = createToken({
  name: "SemiColon",
  pattern: /;/,
  label: "';'"
});

const Equal = createToken({
  name: "Equal",
  pattern: /=/,
  label: "'='"
});

const And = createToken({
  name: "And",
  pattern: /&/,
  label: "'&'"
});

const At = createToken({
  name: "At",
  pattern: /@/,
  label: "'@'"
});

const Questionmark = createToken({
  name: "Questionmark",
  pattern: /\?/,
  label: "'?'"
});

const Star = createToken({
  name: "Star",
  pattern: /\*/,
  label: "'*'"
});

const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: chevrotain.Lexer.SKIPPED,
  line_breaks: true
});

// | PUBLIC
// | PROTECTED
// | PRIVATE
// | STATIC
// | ABSTRACT
// | FINAL    // FINAL for class only -- does not apply to interfaces
// | STRICTFP

// note we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
const allTokens = [
  WhiteSpace,
  // "keywords" appear before the Identifier
  Boolean,
  Char,
  Byte,
  Short,
  Interface,
  Int,
  Long,
  Float,
  Double,
  Void,
  Public,
  Protected,
  Private,
  Static,
  Abstract,
  Final,
  Native,
  Synchronized,
  Transient,
  Extends,
  Implements,
  Super,
  Throws,
  Volatile,
  Strictfp,
  Class,
  Enum,
  Import,
  Package,
  Default,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  DotDotDot,
  Dot,
  Comma,
  SemiColon,
  Equal,
  And,
  LBrace,
  RBrace,
  LCurly,
  RCurly,
  LSquare,
  RSquare,
  Less,
  Greater,
  At,
  Star,
  Questionmark
];

module.exports = {
  allTokens,
  tokens: {
    WhiteSpace,
    Boolean,
    Char,
    Byte,
    Short,
    Interface,
    Int,
    Long,
    Float,
    Double,
    Void,
    Public,
    Protected,
    Private,
    Static,
    Abstract,
    Final,
    Native,
    Synchronized,
    Transient,
    Extends,
    Implements,
    Super,
    Throws,
    Volatile,
    Strictfp,
    Class,
    Enum,
    Import,
    Package,
    Default,
    Identifier,
    DotDotDot,
    Dot,
    Comma,
    SemiColon,
    Equal,
    And,
    LBrace,
    RBrace,
    LCurly,
    RCurly,
    LSquare,
    RSquare,
    Less,
    Greater,
    At,
    Star,
    Questionmark
  }
};
