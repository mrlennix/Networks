var http = require('http')
var base = require('./BaseHandler')

var port = process.argv[2];

if(port == undefined) port =8080;

var server = http.createServer(base.handleRequest);

server.listen(port,() => {
	console.log('Listening on port %d',server.address().port)
})