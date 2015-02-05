// basic helper class
var path = require('path'), fs = require('fs'), _ = require('underscore');

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
		function(error, fileData){
			fileLoaded(fileData);
		}
	);
}

Context.prototype.listDirectories = function(rootDirectory, directoriesFound){
	var self = this;
	self.log.writef('list dir "%s"', [rootDirectory]);

	fs.readdir(rootDirectory, 
		function(error, items) {
			for(var i=0, l=items.length; i<l; i++) {
            	if(items[i][0] !== '.') { // ignore hidden
                	var filePath = rootDirectory+'/'+items[i];
                	self.log.writef('found "%s"', [filePath]);
                	//fs.stat(filePath, checkDirectory);
            	}
        	}
        	directoriesFound(items);
		}
	);
		/*
        var dirs = [],
        filePath,
        checkDirectory = function(err, stat) {
            if(stat.isDirectory()) {
                dirs.push(files[i]);
            }
            if(i + 1 === l) { // last record
                cb(dirs);
            }
        };

        for(var i=0, l=files.length; i<l; i++) {
            if(files[i][0] !== '.') { // ignore hidden
                filePath = dir+'/'+files[i];
                fs.stat(filePath, checkDirectory);
            }
        }
        */
}