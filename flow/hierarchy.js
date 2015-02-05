exports.createHierarchy = function(context){
	return(new Hierarchy())
}

Hierarchy = function(context){
	var self = this;
	self.context = context;
}

Hierarchy.prototype.getNode = function(){
	var self = this;
}