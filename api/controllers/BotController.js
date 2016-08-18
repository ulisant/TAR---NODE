/**
 * BotController
 *
 * @description :: Server-side logic for managing bots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	botTar: function(req, res){
    console.log("aqui esta get");
 		if(req.query['hub.verify_token'] === 'my_voice_is_my_password'){
 			res.send(req.query['hub.challenge'])
 		}
 		res.send('Error, wrong token')
 	},

 	msgEvents: function (req, res) {
		console.log("Entra post msg Events");
 		var messaging_events = req.body.entry[0].messaging
 		for (var i = 0; i < messaging_events.length; i++) {
 			var event = req.body.entry[0].messaging[i]
 			var sender = event.sender.id
 			if (event.message && event.message.text) {
 				var text = event.message.text
 				if (text === 'Generic') {
 					sendGenericMessage(sender)
 					continue
 				}
 				sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
 			}
 			if (event.postback) {
 				var text = JSON.stringify(event.postback)
 				sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
 				continue
 			}
 		}
 		res.sendStatus(200)
 	}
  
 };

 const token = "EAARKbs0sofEBAFkGwPtq7iT9bvHZC7gx5c2YdBn2lNWRVfYOlLwxg2TJKmofEExTw4Op6cc1d6ZCW9cVrkq40EXd6kxJDJ28SZCjkW0IxhQWnrL2tl88jX2dXzqZAaoShtWZCPPnrJQME8qICgDoyb1P2fQRZAtPGwokfONAa5qgZDZD"

 function sendTextMessage(sender, text) {
 	var messageData = { text:text }

 	request({
 		url: 'https://graph.facebook.com/v2.6/me/messages',
 		qs: {access_token:token},
 		method: 'POST',
 		json: {
 			recipient: {id:sender},
 			message: messageData,
 		}
 	}, function(error, response, body) {
 		if (error) {
 			console.log('Error sending messages: ', error)
 		} else if (response.body.error) {
 			console.log('Error: ', response.body.error)
 		}
 	})
 }

 function sendGenericMessage(sender) {
 	var messageData = {
 		"attachment": {
 			"type": "template",
 			"payload": {
 				"template_type": "generic",
 				"elements": [{
 					"title": "First card",
 					"subtitle": "Element #1 of an hscroll",
 					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
 					"buttons": [{
 						"type": "web_url",
 						"url": "https://www.messenger.com",
 						"title": "web url"
 					}, {
 						"type": "postback",
 						"title": "Postback",
 						"payload": "Payload for first element in a generic bubble",
 					}],
 				}, {
 					"title": "Second card",
 					"subtitle": "Element #2 of an hscroll",
 					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
 					"buttons": [{
 						"type": "postback",
 						"title": "Postback",
 						"payload": "Payload for second element in a generic bubble",
 					}],
 				}]
 			}
 		}
 	}
 	request({
 		url: 'https://graph.facebook.com/v2.6/me/messages',
 		qs: {access_token:token},
 		method: 'POST',
 		json: {
 			recipient: {id:sender},
 			message: messageData,
 		}
 	}, function(error, response, body) {
 		if (error) {
 			console.log('Error sending messages: ', error)
 		} else if (response.body.error) {
 			console.log('Error: ', response.body.error)
 		}
 	})
 }
