
var http = require('http'), st = require('st');

exports.createRouter = function(context){
	return(new Router(context));
}

Router = function(context){
	var self = this;
	self.context = context;
	self.context.log.write('creating router');
}

Router.prototype.addStatic = function(url, path){
	var self = this;
	self.mount = st({ path: path, url: url });
	self.context.log.write('added static route "' + url + '" > "' + path + '"');
}

Router.prototype.addHandler = function(url, handler){
	var self = this;
	self.handler = handler;
	self.context.log.write('added handler route "' + url + '"');
}

Router.prototype.start = function(){
	var self = this;

	http.createServer(function(request, response) {
		var stHandled = self.mount(request, response);
  		if (stHandled){
    		return;
  		} else {
  			self.context.request = request;
  			self.context.response = response;
  			self.handler(self.context);
  		}
	}).listen(8080);		
}
