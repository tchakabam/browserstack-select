# browserstack-select

Filters BrowserStack flat map of browser configs from REST API and outputs a JSON array fit to be used with browserstack.json config for browserstack-runner.

## Usage

`node browserstack-select <os> <os_version> <browser> <browser_version> <device>`

Put `any` where you want all possibilies.

**Trim spaces for all values that have spaces!**

For example `OS X` -> `OSX`, `Mountain Lion` -> `MountainLion`, `Motorolla Razor` -> `MotorollaRazor` etc ...

**Expects a file `browserstack.options.json` containing source data in working directory.**

**Adding up configurations**

You can add up several configuration sets. One set consisting of: `<os> <os_version> <browser> <browser_version> <device>`, further abreviated as `<set>`:

`browserstack-select <set> + <set> + ...` will add up results of each set selected.

Source data can be retrieved from BrowserStack API with a command like:

`curl -u "USERNAME:PASSWORD" https://www.browserstack.com/automate/browsers.json > browserstack.options.json`

## Example

We want a config for Chrome 47.0 on all Windows versions.

```
$ browserstack-select Windows any chrome 47.0 any
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

  ## Example: adding up several sets

  ```
  $ browserstack-select Windows 8 chrome 47.0 any + OSX MountainLion chrome 47.0 any
    [ { browser_version: '47.0',
        os: 'OS X',
        browser: 'chrome',
        device: null,
        os_version: 'Mountain Lion' },
      { browser_version: '47.0',
        os: 'Windows',
        browser: 'chrome',
        device: null,
        os_version: '8' } ]
  ```
