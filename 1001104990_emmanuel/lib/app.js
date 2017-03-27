var http = require('http')
var base = require('./BaseHandler')

var ip = process.argv[2];
var port = process.argv[3];

if(port == undefined) port =8080;
if(ip == undefined)ip='localhost'
var server = http.createServer(base.handleRequest);

server.listen(port,  ip,() => {
	console.log('Listening at %s:%d/',ip,server.address().port);
})
