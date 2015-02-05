var node = require('../flow/node.js'), _str = require('underscore.string');

exports.createHierarchy = function(context){
	return(new Hierarchy(context))
}

Hierarchy = function(context){
	var self = this;
	self.context = context;
}

Hierarchy.prototype.getNode = function(nodeUri, nodeLoaded){
	var self = this;
	var fileName = self.context.mapPath(_str.sprintf('/nodes/%s/properties', [nodeUri]));
	self.context.loadFile(fileName, 
		function(fileData){
			self.context.log.write('')
			var resultNode = node.createNode(self.context, self, nodeUri, JSON.parse(fileData));
			nodeLoaded(resultNode);
		}
	);
}

Hierarchy.prototype.getChildNodes = function(nodeUri, childrenLoaded){
	var self = this;
	var directoryName = self.context.mapPath(_str.sprintf('/nodes/%s', [nodeUri]));
	self.context.listDirectories(directoryName,
		function(){
			self.context.log.write('here');
			childrenLoaded();
		}
	);
}