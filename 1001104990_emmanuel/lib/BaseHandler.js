
var fs = require('fs-extra')
var path = require('path')
var BusBoy = require('busboy')



function BaseHandler ()
{
	
}


function GET(req,res)
{
	
	
	if(req.url == '/')
	{
		res.status = 200;
		fs.createReadStream( path.join(__dirname,'/public','/index.html') ).pipe(res)

	}
	else if(fs.existsSync(path.join(__dirname,'/public',req.url)) == false)
	{
		res.status = 404
		res.end("404: File NOT FOUND")
	}
	else
	{
		res.status = 200;
		fs.createReadStream( path.join(__dirname,'/public',req.url) ).pipe(res)
		
	}
	console.log('Status: '+res.status)
	console.log('\n')
}



function POST (req,res)
{
	var busboy = new BusBoy({headers: req.headers});

	req.pipe(busboy);
	
	busboy.on('file', (fieldname,file,filename,encodeing,mimetype) =>{
		
		var fstream = fs.createWriteStream(__dirname+'/public/'+filename);
		
		fstream.on('close',() =>{
			console.log('%s finished uploading',filename);
			res.end('200');
		});

		file.pipe(fstream);
	})

	res.status = 200;
	console.log('Status: '+res.status)
	console.log('\n')
	
	
}

BaseHandler.prototype.handleRequest = function (req,res)
{
	console.log(req.method +' '+ req.url +' HTTP/'+req.httpVersion)
	console.log('Host: '+req.headers['host'])
	console.log('Accept-Encoding:'+req.headers['accept-encoding'])
	
	if(req.method == 'GET') GET(req,res);
	else if(req.method == 'POST') POST(req,res);
}

module.exports = new BaseHandler;