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

Router.prototype.addHandler = function(url, handler){
	var self = this;
	self.handlers[url] = 
		{
			url: url,
			handler: handler
		};

	self.context.log.write('added handler route "' + url + '"');
	self.context.log.write(self.handlers);
}

Router.prototype.getHandler = function(url){
	var self = this;
  	var result = null;
  	_.each(self.handlers,
  		function(handler, index, list){
  			self.context.log.write('check handler "' + handler.url + '"');
  			if(handler.url == '*'){
  				self.context.log.write('set handler');
  				result = handler.handler;
  			}
  		}
  	);
  	self.context.log.write(result);
  	return(result);
}

Router.prototype.start = function(){
	var self = this;

	http.createServer(function(request, response) {
		var stHandled = self.mount(request, response);
  		if (stHandled){
    		return;
  		} else {
 			self.context.log.writeStartRequest();
  			self.context.request = request;
  			self.context.response = response;
  			var handler = self.getHandler('/');
  			handler(self.context);
			self.context.log.writeEndRequest();
  		}
	}).listen(8080);		
}
