exports.createNode = function(context){
	return(new Node())
}

Node = function(context){
	var self = this;
	self.context = context;
}

Node.prototype.getNodeType = function(){
	var self = this;
}