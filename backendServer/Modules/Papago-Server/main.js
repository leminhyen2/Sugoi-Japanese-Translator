
const listOfVariablesData = require("./settings.json")
const websocketServerPortNumber = listOfVariablesData.websocketServerPortNumber

const WebSocket = require('ws');
const webSocketServer = new WebSocket.Server({ port: websocketServerPortNumber });

let copiedTextSubscribingClients = []
let translatedTextSubscribingClients = []

const clipboardy = require('clipboardy');
const clipboardListener = require('clipboard-event');
clipboardListener.startListening();

const DeepL = require('./PapagoTranslator.js');

class DeepLtranslator {
    constructor() {
        this.deepL = new DeepL()
        this.deepLinterval 
    }

    async start() {
        await this.deepL.activate()

        this.deepLinterval = setInterval(async () => {
            let result = await this.deepL.checkIfCurrentTranslationTextChanged(this.deepL.page, this.deepL.resultTextboxID)
            if (result === true) {
                sendMessageAndContentToAllClients(copiedTextSubscribingClients, "copied text from server", this.deepL.copiedText)
                sendMessageAndContentToAllClients(translatedTextSubscribingClients, "translation from server", this.deepL.currentTranslationText)
            }
        }, 300);
    }
    
    stop() {
        this.deepL.stop()
        clearInterval(this.deepLinterval);
    }
}

let deepLtranslator = new DeepLtranslator()

deepLtranslator.start()

let currentTranslationMethod = "DeepL"
let currentCopiedText = ""

clipboardListener.on('change', async () => {
    let value =  clipboardy.readSync();
    if ((checkIfJapaneseText(value) === true) && (checkIfCopiedTextHasChanged(value, currentCopiedText) === true)) {

        console.log("Copied text is Japanese. Initiate translation process")
        currentCopiedText = value

        if (currentTranslationMethod === "DeepL") {
            deepLtranslator.deepL.grabCopiedTextThenTranslate(value)
        }
    }
});

webSocketServer.on('connection', (webSocketConnection) => {
	webSocketConnection.on('message', async (data) => {
		let parsedData = JSON.parse(data)

		let message = parsedData.message
		let content = parsedData.content

		console.log('received: %s', message);

		if (message == "subscribe to copied text updates") {
			copiedTextSubscribingClients.push(webSocketConnection)
		}

		if (message == "subscribe to translated text updates") {
			translatedTextSubscribingClients.push(webSocketConnection)
        }
        
        if (message == "user requests new translation method") {
            if (content === "DeepL") {
                deepLtranslator.start()
            }
            else {
                deepLtranslator.stop()
            }
            console.log(content)
            currentTranslationMethod = content
		}

	});

	webSocketConnection.on('close', () => {
		removeElementFromArray(webSocketConnection, copiedTextSubscribingClients)
		removeElementFromArray(webSocketConnection, translatedTextSubscribingClients)
		clipboardListener.stopListening();
	});

});


function sendMessageAndContentToAllClients(listOfClients, thisMessage, thisContent) {
	console.log("server sending messages to window")
	listOfClients.forEach((client) => {
		client.send(JSON.stringify({message: thisMessage, content: thisContent}));
	})
}

function checkIfCopiedTextHasChanged(copiedText, currentCopiedText) {
    return !(copiedText === currentCopiedText)
}

function checkIfJapaneseText(text) {
    if (text === undefined) {
        text = "繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆縺ｮ縺ｧ縲√ｂ縺?荳蠎ｦ縺願ｩｦ縺励￥縺?縺輔＞縲?"
    }
    else {
        const REGEX_Japanese = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
        const hasJapanese = text.match(REGEX_Japanese);
        if (hasJapanese) {
            return true
        }
        else {
            return false
        }
    }
}












