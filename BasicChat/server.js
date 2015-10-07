var http = require('http'),
	url = require('url'),
	fs = require('fs'),
	clients = [],
	messages = ["testing"];



http.createServer(function (request, response) {
	//parse url
	var url_parts = url.parse(request.url);
	console.log(url_parts);
	if(url_parts.pathname == '/') {
		//file serving
		fs.readFile('./index.html', function(err, data){
			response.end(data);
		});
	}
	else if (url_parts.pathname.substr(0,5) == '/poll'){
		//polling code
		var count = url_parts.pathname.replace(/[^0-9]*/, '');
		console.log(count);
		if(messages.length > count) {
			response.end(JSON.stringify({
				count: messages.length,
				append: messages.slice(count).join("\n")+ "\n"
			}));
		} else {
			clients.push(response);
		}
	} else if (url_parts.pathname.substr(0,5) == '/msg/'){
			//message receiving
			var msg = unescape(url_parts.pathname.substr(5));
			messages.push(msg);
			while(clients.length > 0) {
				var client = clients.pop();
				client.end(JSON.stringify( {
					count: messages.length,
					append: msg+"\n"
				}));
			}
			response.end();
		}

}).listen(8080, 'localhost');
console.log('Server fuckin running on port 8080');