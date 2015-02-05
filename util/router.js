var http = require('http'), st = require('st'), _ = require('underscore'), util = require('util');
var _str = require('underscore.string');

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

  	self.context.log.write(util.inspect(url));
  	_.each(self.handlers,
  		function(handler, index, list){
  			if(result == null && _str.startsWith(url, handler.url)){
  				self.context.log.writef('use handler "%s"', [handler.name]);
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
  			self.context.log.writef('static "%s"', [request.url]);
    		return;
  		} else {
 			self.context.log.writeStartRequest(request.url);
  			self.context.request = request;
  			self.context.response = response;
  			var handler = self.getHandler(request.url);
  			handler(self.context);
			self.context.log.writeEndRequest(request.url);
			self.context.log.write('');
  		}
	}).listen(8080);		
}
