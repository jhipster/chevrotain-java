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
  Package,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Dot,
  SemiColon
];

module.exports = {
  allTokens,
  tokens: {
    WhiteSpace,
    Package,
    Identifier,
    Dot,
    SemiColon
  }
};
