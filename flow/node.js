exports.createNode = function(context, nodeUri, nodeData){
	return(new Node(context, nodeUri, nodeData))
}

Node = function(context, nodeUri, nodeData){
	var self = this;
	self.context = context;
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
	self.context.log.write('in run action');

	self[action](
		function(actionResult){
			actionComplete(
				{
					uri: self.nodeUri,
					action: action,
					result: actionResult				
				}
			);
			//var result = self.wrapActionResult('info', self.nodeData);
			//self.context.log.write(JSON.stringify(result));
			//actionComplete(result);
		}
	);
	/*
		function(actionResult){
			self.context.log.write('run action done ' + JSON.stringify(actionResult));
			actionComplete('here');
		}
	);
	*/
}

Node.prototype.info = function(actionComplete){
	var self = this;
	self.context.log.write('in info action');

	actionComplete(self.nodeData);
}