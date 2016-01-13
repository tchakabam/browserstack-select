#!/usr/bin/env node

var path = require('path');
var args = Array.prototype.slice.call(process.argv, 2);

var CARDINALITY = 5;

function printUsage() {
  console.log('\nbrowserstack-select: Filters BrowserStack flat map of browser configs from REST API and outputs a JSON array fit to be used with browserstack.json config for browserstack-runner.\n\nUsage: `node browserstack-select.js <os> <os_version> <browser> <browser_version> <device>`\n(put `any` where you want all possibilies)');
  console.log('\nExpects a file `browserstack.options.json` containing source data in working directory.');
  console.log('Source data can be retrieved from BrowserStack API with a command like `curl -u "USERNAME:PASSWORD" https://www.browserstack.com/automate/browsers.json > browserstack.options.json`');
  console.log('');
}

if (!args.length) {
  printUsage();
  process.exit(1);
}

function validArgsLength() {
  return (args.length + 1) % (CARDINALITY + 1) === 0;
}

function getArgsOffset() {
  return (args.length + 1) / (CARDINALITY + 1);
}

var countMode = false;
var count = 0;

if (args[0] === '--count') {
  countMode = true;
  args.shift();
}

if (!validArgsLength()) {
  console.error('Invalid arguments length: %d\n\n', args.length);
  printUsage();
  process.exit(1);
}

var output = [];
var options = require(path.resolve('./browserstack.options.json'));
var offset = getArgsOffset();

while(offset-- > 0) {

  options.forEach(function(item) {

    function checkValidSeperator() {
      var sep = getArg(5);
      return sep === undefined || sep === '+';
    }

    function getArg(index) {
      return args[index + (CARDINALITY + 1) * offset];
    }

    function getFieldValue(field) {
      return item[field] ? item[field].replace(/ /g, '') : null;
    }

    function checkArg(field, argIndex) {
      return (getFieldValue(field) === getArg(argIndex) || getFieldValue(field) === null || 'any' === getArg(argIndex));
    }

    if(!checkValidSeperator()) {
      console.error('Invalid seperator: ' + getArg(5));
      process.exit(1);
    }

    if (
         checkArg('device', 4)
      && checkArg('browser_version', 3)
      && checkArg('browser', 2)
      && checkArg('os_version', 1)
      && checkArg('os', 0)
      ) {
      output.push(item);

      count++;
    }

  });
}

if (countMode) {
  console.log(count);
  process.exit();
}

console.log(JSON.stringify(output));
