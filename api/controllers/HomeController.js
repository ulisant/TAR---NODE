/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getPosts: function (req, res){

		var http = require('http'), options = {
			host : "40.118.210.129",
			port : 8080,
			path : "/restrobos/posts/",
			method: "GET"
		};

		var rest_api_data = "";

		var rest_api_request = http.request(options, function(rest_api_response){

			rest_api_response.on('data', function(chunk){
				rest_api_data += chunk;
			});

			rest_api_response.on('end', function(){
				var initData = JSON.parse(rest_api_data)
				res.view('home/home', {
					title: "Home",
					data: initData.results,
				});
			});

			rest_api_response.on('error', function(e){
				console.log(e.message);
			});

		}).end();

	}
};
