var _str = require('underscore.string'), moment = require('moment');

exports.createLog = function(context){
	return(new Log(context));
}

Log = function(context){
	var self = this;
	self.context = context;
	
	self.logPath = self.context.mapPath('/logs');
	self.writef('init logger in "%s"', [self.logPath]);
}

Log.prototype.writeStartRequest = function(url){
	var self = this;
	self.writef('>>> "%s"', [url]);
}

Log.prototype.writeEndRequest = function(url){
	var self = this;
	self.writef('<<< "%s"', [url]);
}

Log.prototype.write = function(message){
	var self = this;
	self.writef(message, []);
}

Log.prototype.writef = function(message, arguments){
	var self = this;
	console.log(moment().format('HH:mm:ss ') + _str.sprintf(message, arguments));
}

Log.prototype.writeException = function(){
	var self = this;
}
