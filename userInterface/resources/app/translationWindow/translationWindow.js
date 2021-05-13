const WebSocketConnection = require("../WebsocketConnection.js")
const webSocketConnection = new WebSocketConnection(WebSocket);
const fontList = require('font-list')

async function getFonts() {
  var temp = document.getElementById("selecth1FontFamily");
  fontList
    .getFonts()
    .then((fonts) => {
        var cuisines = fonts;     
        var sel = document.getElementById('selecth1FontFamily');
        var fragment = document.createDocumentFragment();

        cuisines.forEach(function(cuisine, index) {
            var opt = document.createElement('option');
            opt.innerHTML = cuisine;
            opt.value = cuisine;
            //opt.style.fontFamily = cuisine;
            fragment.appendChild(opt);
        });

        sel.appendChild(fragment);
    })
    .catch((err) => {
      console.log(err);
    });
}
getFonts();
webSocketConnection.websocket.onopen = function() {
    webSocketConnection.sendDataToWebSocketServer("subscribe to copied text updates", "no content")
    webSocketConnection.sendDataToWebSocketServer("subscribe to translated text updates", "no content")
};

webSocketConnection.websocket.onmessage = function incoming(info) {
    hideExtraNote()
    console.log(info);

    let parsedInfo = JSON.parse(info.data)
    let message = parsedInfo.message
    let content = parsedInfo.content

    if (message === "copied text from server") {
        let extractedText = content
        document.getElementById("extractedText").innerHTML = extractedText
    }

    if (message === "translation from server") {
        let translatedText = content
        document.getElementById("translatedText").innerHTML = translatedText
    }
};

let extraNote = document.getElementById("extraNote")

function hideExtraNote() {
    extraNote.style.display = "none"
}

const translationSelection = document.getElementById("translationSelection"); 

translationSelection.addEventListener("change", requestNewTranslationMethodFromServer);

function requestNewTranslationMethodFromServer() {
    webSocketConnection.sendDataToWebSocketServer("user requests new translation method", translationSelection.value)
}