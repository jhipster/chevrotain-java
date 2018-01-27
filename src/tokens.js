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

const Static = createKeywordToken({
  name: "Static",
  pattern: /static/,
  label: "'static'"
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

const SemiColon = createToken({
  name: "SemiColon",
  pattern: /;/,
  label: "';'"
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

// note we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
const allTokens = [
  WhiteSpace,
  // "keywords" appear before the Identifier
  Static,
  Class,
  Enum,
  Interface,
  Import,
  Package,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Dot,
  SemiColon,
  LCurly,
  RCurly,
  Star
];

module.exports = {
  allTokens,
  tokens: {
    WhiteSpace,
    Static,
    Class,
    Enum,
    Interface,
    Import,
    Package,
    Identifier,
    Dot,
    SemiColon,
    LCurly,
    RCurly,
    Star
  }
};
