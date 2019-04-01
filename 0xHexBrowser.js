const ipc = require('electron').ipcRenderer
let configOptions = require('./configOptions.js')
let settings = configOptions.settings();
let tabs = configOptions.tabs();

// Manually create the webviews if we're not using browserViews
if (!settings.useBrowserViews) {
  window.onresize = repositionWebView;
  
  // create webviews
  let tabContainer = document.querySelector("#tabBrowserViewContainer")

  tabs.forEach(tab => {
    let webviewHTML = `
      <webview 
        id="webview-${tab.id}">
      </webview>`

    tabContainer.appendChild(createElementFromHTML(webviewHTML)) 
  })
}

// Position the active webviews
function repositionWebView() {
  var webview = document.querySelector('webview.active');
  var controls = document.querySelector('#controls');
  var controlsHeight = controls.offsetHeight;
  var tabControls = document.querySelector('#tabs');
  var tabControlsHeight = tabControls.offsetHeight + 1;
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight - tabControlsHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';
  webview.style.top = '60px';
}

// Utility function to create elements from an HTML string
function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild; 
}

// Let `main.js` know we're ready to be bootstrapped
ipc.send('initialize', ' ')

// Create the tab headings in the UI and set click handlers
// if we're using webviews: manually 
ipc.on('setTabs', (event, args) => {
  var tabsNode = document.querySelector('#tabs')
  tabsNode.innerHTML = '';

  args.forEach(tab => {
    var tabHTML = `
      <div class="tab">
        <div class="tabTitle">${tab.title}</div>
        <div class="tabClose">&times;</div>
      </div>`
    var tabNode = createElementFromHTML(tabHTML)

    if (tab.active) {
      // Add the "active" class
      tabNode.classList.add("active")
      // Set the URL location bar
      document.querySelector('#location').value = tab.url
    }

    // WebViews
    if (!settings.useBrowserViews) {
      var webviewNode = document.querySelector(`#webview-${tab.id}`)
      if (tab.active) {
        webviewNode.classList.add("active")
        repositionWebView()
        if (!webviewNode.getAttribute("src")) {
          webviewNode.setAttribute("src", tab.url);
        }
      } else {
        webviewNode.classList.remove("active")
      }
    }

    // Setup click handlers
    tabNode.onclick = function(){
      ipc.send('nagivateToTab', tab)
    }
    
    // And finally, add the tab headings to the screen
    tabsNode.appendChild(tabNode)
  })

  // Add button (not working yet)
  let tabAddNode = createElementFromHTML(`<button id="addTab">+</button>`)
  tabsNode.appendChild(tabAddNode)

});
