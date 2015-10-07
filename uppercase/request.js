var http = require("http");
var request = http.request({
	hostname: "localhost",
	port: 8000,
	method: "POST"
}, function(response){
	response.on("data", function(chunk){
		process.stdout.write(chunk.toString());
	});
});
request.end("everything here will go 3245 to Up_er case");