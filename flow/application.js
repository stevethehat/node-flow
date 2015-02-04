
exports.createApplication = function(){
	return(new Application());
}

Application = function(){
	var self = this;
}

Application.prototype.run = function(){
	var self = this;
	var context = require('../util/context.js').createContext();
	var router = require('../util/router.js').createRouter(context);

	router.addStatic('/static', process.cwd() + '/static');
	router.addHandler('*', function(context){
		context.response.writeHead(200, {'Content-Type': 'text/html'});
  		//response.write('<html><head><link rel="stylesheet" href="/static/css/pure-min.css"/></head><body><h1>Hello World</h1></body></html>');
  		var template = require('../util/templaterenderer').createTemplateRenderer();
  		context.response.write(template.render());
  		context.response.end();
	});
	router.start();
}
