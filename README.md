# 0xHEX Browser

A mini browser that shows the usage of [browserViews](https://electronjs.org/docs/api/browser-view) in an app.

## Run

1. Install Electron via `npm install -g electron`
2. Navigate the root directory via `cd 0xHexBrowser`
2. Run the sample via `electron .`

## Config Options

Checkout `configOptions.js` to change settings such as whether to use BrowserViews or WebViews. Example:

```
"devTools":         false,
"useBrowserViews":  true,
"alwaysReload":     true,
"alwaysReloadAndIgnoreCache": true
```

### Tabs

To configure the starting tabs, change the `tabs` property found in `configOptions.js`

