const listOfVariablesData = require("./listOfVariablesData.json")
const websocketServerPortNumber = listOfVariablesData.websocketServerPortNumber

class WebsocketConnection {
    constructor(thisWebsocketClass) {
        this.websocket = new thisWebsocketClass(`ws://localhost:${websocketServerPortNumber}/`)
    }
    sendDataToWebSocketServer(thisMessage, thisContent) {
        this.websocket.send(JSON.stringify({message: thisMessage, content: thisContent}));
    }
}

module.exports = WebsocketConnection