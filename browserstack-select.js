//console.log(options);

var args = Array.prototype.slice.call(process.argv, 2);

if (!args.length) {
  console.log('\nbrowserstack-select: Filters BrowserStack flat map of browser configs from REST API and outputs a JSON array fit to be used with browserstack.json config for browserstack-runner.\n\nUsage: `node browserstack-select <os> <os_version> <browser> <browser_version> <device>`\n(put `any` where you want all possibilies)');
  console.log('\nExpects a file `browserstack.options.json` containing source data in working directory.');
  console.log('Source data can be retrieved from BrowserStack API with a command like `curl -u "USERNAME:PASSWORD" https://www.browserstack.com/automate/browsers.json > browserstack.options.json`');
  console.log('');
  return;
}

var output = [];

//console.log(args);

var options = require('./browserstack.options.json');

options.forEach(function(item) {

  function checkArg(field, argIndex) {
    return (item[field] === args[argIndex] || item[field] === null || 'any' === args[argIndex]);
  }

  if (
       checkArg('device', 4)
    && checkArg('browser_version', 3)
    && checkArg('browser', 2)
    && checkArg('os_version', 1)
    && checkArg('os', 0)
    ) {
    output.push(item);
  }

});

console.log(output);
