var http = require('http'), st = require('st'), _ = require('underscore');

exports.createRouter = function(context){
	return(new Router(context));
}

Router = function(context){
	var self = this;
	self.context = context;
	self.context.log.write('creating router');

	self.handlers = {};
}

Router.prototype.addStatic = function(url, path){
	var self = this;
	self.mount = st({ path: path, url: url, cache: false });
	self.context.log.write('added static route "' + url + '" > "' + path + '"');
}

Router.prototype.addHandler = function(name, url, handler){
	var self = this;
	self.handlers[url] = 
		{
			name: name,
			url: url,
			handler: handler
		};

	self.context.log.write('added handler route "' + url + '"');
}

Router.prototype.getHandler = function(url){
	var self = this;
  	var result = null;
  	_.each(self.handlers,
  		function(handler, index, list){
  			if(handler.url == '*'){
  				self.context.log.write('use handler "' + handler.name + '"');
  				result = handler.handler;
  			}
  		}
  	);
  	return(result);
}

Router.prototype.start = function(){
	var self = this;

	http.createServer(function(request, response) {
		var stHandled = self.mount(request, response);
  		if (stHandled){
  			self.context.log.write('static "' + request.url + '"');
    		return;
  		} else {
 			self.context.log.writeStartRequest(request.url);
  			self.context.request = request;
  			self.context.response = response;
  			var handler = self.getHandler('/');
  			handler(self.context);
			self.context.log.writeEndRequest(request.url);
			self.context.log.write('');
  		}
	}).listen(8080);		
}
