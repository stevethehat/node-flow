exports.createTemplateRenderer = function(){
	return(new TemplateRenderer());
}

TemplateRenderer = function(){
	var self = this;
	self.handlebars = require('handlebars');
	var path = require('path');
	self.templatePath = path.resolve(process.cwd(), 'static/templates/base.htm');
	self.compiledTransform = self.handlebars.compile(String(require('fs').readFileSync(self.templatePath)));
}

TemplateRenderer.prototype.render = function(data){
	var self = this;
	return(self.compiledTransform(data));
}