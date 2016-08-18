/**
 * BotController
 *
 * @description :: Server-side logic for managing bots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	botTar: function(req, res){
		if(req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me'){
			res.send(req.query['hub.challenge'])
		}
		res.send('Error, wrong token')
	}
};
