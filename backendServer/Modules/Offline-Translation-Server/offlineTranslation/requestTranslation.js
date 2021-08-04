const fetch = require('node-fetch');


function sendMessageToServer(thisContent, thisMessage) {  
	fetch(`http://localhost:14366/`, {
			method: 'post',
			body:    JSON.stringify({content: thisContent, message: thisMessage}),
			headers: { 'Content-Type': 'application/json' },
		})
		.then(res => res.json())
		.then(json => console.log(json));
}

sendMessageToServer("ありがとう。来てくれて、嬉しいよ", "translate sentences")