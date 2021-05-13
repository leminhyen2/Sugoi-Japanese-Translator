const WebSocketConnection = require("../WebsocketConnection.js")
const webSocketConnection = new WebSocketConnection(WebSocket);

webSocketConnection.websocket.onopen = () => {
    webSocketConnection.sendDataToWebSocketServer("hello server", "no content")
};
webSocketConnection.websocket.onmessage = function incoming(info) {
    console.log(info);
    let parsedInfo = JSON.parse(info.data)
    let message = parsedInfo.message
    let content = parsedInfo.content
};

const {
    ipcRenderer,
    desktopCapturer,
    screen,
    shell, 
    remote,
} = require('electron');

const BrowserWindow = remote.BrowserWindow;

let screenCaptureWindowPosition 
let TextCaptureWindow = {}

let listOfLanguages = new Map(Object.entries({
    "English": "en",
    "Spanish": "es",
    "French": "fr",
    "Russian": "ru",
    "Korean": "ko",
    "Chinese (simplified)": "zh-Hans",
    "Chinese (traditional)": "zh-Hant",
    "Indonesian": "id",
    "Vietnamese": "vi",
    "Thai": "th",
    "Afrikaans": "af",
    "Arabic": "ar",
    "Bangla": "bn",
    "Bosnian": "bs",
    "Bulgarian": "bg",
    "Cantonese (traditional)": "yue",
    "Catalan": "ca",
    "Croatian": "hr",
    "Czech": "cs",
    "Danish": "da",
    "Dutch": "nl",
    "Estonian": "et",
    "Fijian": "fj",
    "Filipino": "fil",
    "Finnish": "fi",
    "German": "de",
    "Greek": "el",
    "Haitian Creole": "ht",
    "Hebrew": "he",
    "Hindi": "hi",
    "Hmong Daw": "mww",
    "Hungarian": "hu",
    "Icelandic": "is",
    "Irish": "ga",
    "Italian": "it",
    "Japanese": "ja",
    "Kannada": "kn",
    "Klingon": "tlh",
    "Latvian": "lv",
    "Lithuanian": "lt",
    "Malagasy": "mg",
    "Malay": "ms",
    "Malayalam": "ml",
    "Maltese": "mt",
    "Maori": "mi",
    "Norwegian": "nb",
    "Persian": "fa",
    "Polish": "pl",
    "Portuguese (Brazil)": "pt",
    "Portuguese (Portugal)": "pt-pt",
    "Punjabi": "pa",
    "Romanian": "ro",
    "Samoan": "sm",
    "Serbian (Cyrillic)": "sr-Cyrl",
    "Serbian (Latin)": "sr-Latn",
    "Slovak": "sk",
    "Slovenian": "sl",
    "Swahili": "sw",
    "Swedish": "sv",
    "Tahitian": "ty",
    "Tamil": "ta",
    "Telugu": "te",
    "Tongan": "to",
    "Turkish": "tr",
    "Ukrainian": "uk",
    "Urdu": "ur",
    "Welsh": "cy",
    "Yucatec Maya": "yua"
}))

const selectElement = document.getElementById("languagesSelection"); 

for (let [key, value] of listOfLanguages) {
    let optionElement = document.createElement("option");
    optionElement.textContent = key;
    optionElement.value = value;
    selectElement.appendChild(optionElement);
}

selectElement.addEventListener("change", requestServerToUpdateNewTranslationLanguage);

function requestServerToUpdateNewTranslationLanguage() {
    let newLanguage = selectElement.value;
    webSocketConnection.sendDataToWebSocketServer("update translation language", newLanguage)
}



// ipcRenderer.on('new coordinates from screen capture window', (event, arg) => {
//     screenCaptureWindowPosition = arg
//     console.log("new position",screenCaptureWindowPosition) 
// })

// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"


// ipcRenderer.send('asynchronous-message', 'ping')

sendMessageToUser("VERY IMPORTANT: CHANGE YOUR WINDOW SCALE LAYOUT TO 100%. Move then resize the window to fit the text section in VN. Don't forget to initialize the background removal setting.")

document.getElementById("generateAllWindow").onclick = (e) => {
    generateImageSettingsWindow()
    generateTranslationWindow()
    generateTextCaptureWindow()
    minimizeCurrentWindow()
}

document.getElementById("generateImageSettingsWindow").onclick = (e) => {
    generateImageSettingsWindow()
}

document.getElementById("generateTextCaptureWindow").onclick = (e) => {
    generateTextCaptureWindow()
}

document.getElementById("generateTranslationWindow").onclick = (e) => {
    generateTranslationWindow()
}

const generateImageSettingsWindow = () => {
    TextCaptureWindow = new BrowserWindow({
        title: "Background Removal Window",
        x: -100,
        y: 0,
        width: 900,
        height: 1100,
        alwaysOnTop: true,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
  });
    TextCaptureWindow.loadFile('./imageSettingsWindow/imageSettingsWindow.html')
}

const generateTextCaptureWindow = () => {
    TextCaptureWindow = new BrowserWindow({
        title: "Text Capture Window",
        opacity: 0.7,
        x: 800,
        y: 700,
        width: 700,
        height: 120,
        alwaysOnTop: true,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
  });
    TextCaptureWindow.loadFile('./screenCaptureWindow/screenCaptureWindow.html')
}

const generateTranslationWindow = () => {
    TextCaptureWindow = new BrowserWindow({
        title: "Translation Display Window",
        opacity: 0.7,
        x: 800,
        y: 300,
        width: 600,
        height: 250,
        alwaysOnTop: true,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
  });
    TextCaptureWindow.loadFile('./translationWindow/translationWindow.html')
    TextCaptureWindow.removeMenu()
}

function sendMessageToUser(message) {
    document.getElementById("messageContainer").innerHTML = message
}

function getAllKeysPostiionMetrics() {
    return remote.getCurrentWindow().getNormalBounds()
}

function minimizeCurrentWindow() {
    return remote.getCurrentWindow().minimize()
}


