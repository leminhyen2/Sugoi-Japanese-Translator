const listOfVariablesData = require("./listOfVariablesData.json")
const pythonFlaskServerPortNumber = listOfVariablesData.pythonFlaskServerPortNumber
const windowStateKeeper = require('electron-window-state');
const {app, BrowserWindow, globalShortcut, screen, ipcMain} = require('electron');

const fetch = require('node-fetch');

let translationWindow  

const generateTranslationWindow = () => {
  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 300
  });
  translationWindow = new BrowserWindow({
      title: "Translation Display Window",
      'x': mainWindowState.x,
      'y': mainWindowState.y,
      'width': mainWindowState.width,
      'height': mainWindowState.height,
      transparent:true,
      frame:false,
      alwaysOnTop: true,
      webPreferences: {
          enableRemoteModule: true,
          nodeIntegration: true
      }
});
  translationWindow.loadFile('./translationWindow/translationWindow.html')
  //translationWindow.removeMenu()
  mainWindowState.manage(translationWindow);
}


// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.reply('asynchronous-reply', 'pong')
// })

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })


// This method will be called when Electron has finished
// initialization and is rea browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  generateTranslationWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) generateTranslationWindow()
  })
})

app.on('will-quit', () => {  
	// Unregister all shortcuts.
  globalShortcut.unregisterAll()
  
  sendMessageToServer(pythonFlaskServerPortNumber, "no content", "close server") //close python flask server
  //sendMessageToServer(httpServerPortNumber, "no content", "close server") //close node server
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function sendMessageToServer(serverPort, thisContent, thisMessage) {  
	fetch(`http://localhost:${serverPort}/`, {
			method: 'post',
			body:    JSON.stringify({content: thisContent, message: thisMessage}),
			headers: { 'Content-Type': 'application/json' },
		})
		.then(res => res.json())
		.then(json => console.log(json));

}

ipcMain.on('close-me', (evt, arg) => {
  app.quit()
})