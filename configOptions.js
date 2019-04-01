module.exports = {
    settings: () => {
        return {
            "devTools":         true,
            "useBrowserViews":  false,
            "alwaysReload":     true,
            "alwaysReloadAndIgnoreCache": true
        }
    },
    
    tabs: () => {
        return [  
            { 
              "id": 1,
              "url": "https://www.github.com",
              "title": "Github"
            },
            { 
              "id": 2,
              "url": "https://electronjs.org",
              "title": "Electron",
              "active": true
            },
            { 
              "id": 3,
              "url": "https://trello.com/login",
              "title": "Trello"
            }
        ]
    }



};