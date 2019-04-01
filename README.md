# 0xHEX Browser

```
                           _             
       __      _____  _ __| | __         
       \ \ /\ / / _ \| '__| |/ /         
        \ V  V / (_) | |  |   <          
         \_/\_/ \___/|_|  |_|\_\         
                (_)_ __                  
                | | '_ \                 
                | | | | |                
 _ __  _ __ ___ |___|_|_|__ ___  ___ ___ 
| '_ \| '__/ _ \ / _` | '__/ _ \/ __/ __|
| |_) | | | (_) | (_| | | |  __/\__ \__ \
| .__/|_|  \___/ \__, |_|  \___||___/___/
|_|              |___/                   
```

A mini browser that shows the usage of [browserViews](https://electronjs.org/docs/api/browser-view) in an app.

![0xHexBrowser Screenshot](https://raw.githubusercontent.com/lokimeyburg/0xHexBrowser/master/image.png)

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

