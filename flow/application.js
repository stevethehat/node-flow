
exports.createApplication = function(){
	return(new Application());
}

Application = function(){
	var self = this;
}

Application.prototype.run = function(){
	var self = this;
	var http = require('http'), st = require('st');
	var context = require('../util/context.js').createContext();
	var mount = st({ path: process.cwd() + '/static', url: '/static' });

	http.createServer(function(request, response) {
		var stHandled = mount(request, response);
  		if (stHandled){
    		return;
  		} else {
  			response.writeHead(200, {'Content-Type': 'text/html'});
  			//response.write('<html><head><link rel="stylesheet" href="/static/css/pure-min.css"/></head><body><h1>Hello World</h1></body></html>');
  			var template = require('../util/templaterenderer').createTemplateRenderer();
  			response.write(template.render());
  			response.end();
  		}
	}).listen(8080);	
}
