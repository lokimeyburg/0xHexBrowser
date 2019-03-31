# 0xHEX Browser

A mini browser that shows the usage of [browserViews](https://electronjs.org/docs/api/browser-view) in an app.

```
$ electron .
```

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

