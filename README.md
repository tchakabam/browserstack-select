# browserstack-select

Filters BrowserStack flat map of browser configs from REST API and outputs a JSON array fit to be used with browserstack.json config for browserstack-runner.

Usage: `node browserstack-select <os> <os_version> <browser> <browser_version> <device>`
(put `any` where you want all possibilies)

Expects a file `browserstack.options.json` containing source data in working directory.

Source data can be retrieved from BrowserStack API with a command like 

`curl -u "USERNAME:PASSWORD" https://www.browserstack.com/automate/browsers.json > browserstack.options.json`

## EXAMPLE

We want a config for Chrome 47.0 on all Windows versions.

```
$ node browserstack-select.js Windows any chrome 47.0 any
[ { os_version: 'XP',
    browser_version: '47.0',
    device: null,
    os: 'Windows',
    browser: 'chrome' },
  { os_version: '8',
    browser_version: '47.0',
    device: null,
    os: 'Windows',
    browser: 'chrome' },
  { os_version: '7',
    browser_version: '47.0',
    device: null,
    os: 'Windows',
    browser: 'chrome' },
  { os_version: '10',
    browser_version: '47.0',
    device: null,
    os: 'Windows',
    browser: 'chrome' },
  { os_version: '8.1',
    browser_version: '47.0',
    device: null,
    os: 'Windows',
    browser: 'chrome' } ]
  ```
