"use strict";
/* eslint-disable import/no-extraneous-dependencies, no-console */
const Benchmark = require("benchmark");
const chevrotainJava = require("../src/index");

const input = require("./samples/small");
const suite = new Benchmark.Suite();

chevrotainJava.parse(input);

// add tests
suite
  .add("Chevrotain Based Parser", () => {
    chevrotainJava.parse(input);
  })
  // add listeners
  .on("cycle", event => {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });
