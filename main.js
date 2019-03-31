const {app, BrowserWindow, BrowserView} = require('electron')
let configOptions = require('./configOptions.js')
let mainWindow;
let settings = configOptions.settings()
let tabs = configOptions.tabs()


app.on('ready', function() {
  // Create the main window
  mainWindow = new BrowserWindow({width: 1024, height: 768 });
  mainWindow.loadURL('file://' + __dirname + '/0xHexBrowser.html');

  // Dev tools
  if (settings.devTools){
    mainWindow.openDevTools();
  }

  // Navigate to tab by marking the new tab as active. If browserViews
  // are being used, then find the relevant browserView and load it
  // and then position it correctly
  function nagivateToTab(tab) {
    tabs.forEach(t => {
      if(t.id == tab.id) {
        t.active = true
      } else {
        t.active = false
      }
    })

    if(settings.useBrowserViews){
      // Find the new active browserview and load it
      let allBrowserViews = BrowserView.getAllViews()
      let activeBrowserView = allBrowserViews.filter(obj => {
        return obj.id === tab.id
      })
      activeBrowserView = activeBrowserView[0]

      // only load the URL the first time or if `alwaysReload` is set
      if (activeBrowserView.webContents.currentIndex == -1) {
        activeBrowserView.webContents.loadURL(tab.url)
      } else if (settings.alwaysReloadAndIgnoreCache) {
        activeBrowserView.webContents.reloadIgnoringCache()
      } else if (settings.alwaysReload)  {
        activeBrowserView.webContents.reload()
      }

      // manually set and position the browserview 
      mainWindow.setBrowserView(activeBrowserView)
      repositionBrowserView(activeBrowserView)
    }
  }

  // Manually resposition the browserView
  function repositionBrowserView(view) {
    let winSize   = mainWindow.getSize()
    let winWidth  = winSize[0]
    let winHeight = winSize[1]
    let marginX = 0
    let marginY = 60
    let browserViewWidth = winWidth - marginX
    let browserViewHeight = winHeight - marginY
    view.setBounds({  x: marginX, 
                      y: marginY, 
                      width: browserViewWidth, 
                      height: browserViewHeight })
  }

  // Manually reposition the browserView when the mainWindow is resized
  mainWindow.on('resize', () => {
    repositionBrowserView(mainWindow.getBrowserView())
  })

  // IPC listeners
  // -------------
  const ipc = require('electron').ipcMain;

  // Initialize is called when the guest page declares 
  // that it is ready to be bootstrapped
  ipc.on('initialize', (event, args) => {
    
    // Create browserViews for each tab
    if (settings.useBrowserViews){
      tabs.forEach(tab => {
        let browserViewInstace = new BrowserView({
          webPreferences: {
            nodeIntegration: false
          }
        })
        mainWindow.setBrowserView(browserViewInstace)
      })
    }
    // Send the initial collection of tabs to be rendered
    // by the main window
    event.sender.send('setTabs', tabs)

    // push active tab onto the stack and load it
    var activeTab = tabs.filter(obj => {
      return tab.active
    })
    nagivateToTab(activeTab)
  })

  ipc.on('nagivateToTab', (event, args) => {
    nagivateToTab(args)
    // since the state of the tabs have changed, we need to
    // let the mainWindow know about the updated state
    event.sender.send('setTabs', tabs)
  })

});

// When the window closes, terminate the app
app.on('window-all-closed', function() {
  app.quit();
});