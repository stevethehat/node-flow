exports.createNodeTypes = function(context){
	return(new NodeTypes())
}

NodeTypes = function(context){
	var self = this;
	self.context = context;
}

NodeTypes.prototype.getNodeType = function(){
	var self = this;
}