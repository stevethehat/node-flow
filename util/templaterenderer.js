exports.createTemplateRenderer = function(){
	return(new Context());
}

TemplateRenderer = function(){
	var self = this;
	self.handlebars = require('handlebars');
}

TemplateRenderer.prototype.render = function(){

}