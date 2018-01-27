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

const Import = createKeywordToken({
  name: "Import",
  pattern: /import/,
  label: "'import'"
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

const At = createToken({
  name: "At",
  pattern: /@/,
  label: "'@'"
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
  Public,
  Protected,
  Private,
  Static,
  Abstract,
  Final,
  Strictfp,
  Class,
  Enum,
  Interface,
  Import,
  Package,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Dot,
  Comma,
  SemiColon,
  Equal,
  LBrace,
  RBrace,
  LCurly,
  RCurly,
  At,
  Star
];

module.exports = {
  allTokens,
  tokens: {
    WhiteSpace,
    Public,
    Protected,
    Private,
    Static,
    Abstract,
    Final,
    Strictfp,
    Class,
    Enum,
    Interface,
    Import,
    Package,
    Identifier,
    Dot,
    Comma,
    SemiColon,
    Equal,
    LBrace,
    RBrace,
    LCurly,
    RCurly,
    At,
    Star
  }
};
