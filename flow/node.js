exports.createNode = function(context, hierarchy, nodeUri, nodeData){
	return(new Node(context, hierarchy, nodeUri, nodeData))
}

Node = function(context, hierarchy, nodeUri, nodeData){
	var self = this;
	self.context = context;
	self.hierarchy = hierarchy;
	self.nodeUri = nodeUri;
	self.nodeData = nodeData;
}

Node.prototype.getNodeType = function(){
	var self = this;
}

Node.prototype.wrapActionResult = function(action, result){
	var self = this;
	return(
		{
			uri: self.nodeUri,
			action: action,
			result: result
		}
	);
}

Node.prototype.runAction = function(action, actionComplete){
	var self = this;
	self[action](
		function(actionResult){
			actionComplete(
				{
					uri: self.nodeUri,
					action: action,
					result: actionResult				
				}
			);
		}
	);
}

Node.prototype.info = function(actionComplete){
	var self = this;
	actionComplete(self.nodeData);
}

Node.prototype.getchildren = function(actionComplete){
	var self = this;
	self.hierarchy.getChildNodes(self.nodeUri, 
		function(){
			actionComplete({});
		}
	);
}