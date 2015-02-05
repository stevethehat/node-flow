// basic helper class
var path = require('path'), fs = require('fs');

exports.createContext = function(){
	return(new Context());
}

Context = function(){
	var self = this;
	self.log = require('./log.js').createLog(self);
	self.log.write('creating context');
	self.responseCode = 200;
	self.contentType = 'text/html';
}

Context.prototype.setContentType = function(contentType){
	var self = this;
	self.contentType = contentType;
}

Context.prototype.setResponseCode = function(responseCode){
	var self = this;
	self.responseCode = responseCode;
}

Context.prototype.sendResponse = function(content){
	var self = this;
	self.response.writeHead(self.responseCode, {'Content-Type': self.ContentType});
  	self.response.write(content);
  	self.response.end();
}

Context.prototype.mapPath = function(pathToMap){
	var self = this;
	return(process.cwd() + pathToMap);
}

Context.prototype.loadFile = function(fileName, fileLoaded){
	var self = this;
	self.log.writef('load "%s"', [fileName]);
	fs.readFile(fileName, 
		function(fileData){
			fileLoaded(fileData);
		}
	);
}