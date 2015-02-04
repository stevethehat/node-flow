
exports.createLog = function(){
	return(new Log());
}

Log = function(){
	var self = this;
	var path = require('path');
	self.moment = require('moment');


	self.logPath = path.resolve(process.cwd(), 'logs');
	self.write('init logger in "' + self.logPath + '"');
}

Log.prototype.writeStartRequest = function(){
	var self = this;
	self.write('>>>');
}

Log.prototype.writeEndRequest = function(){
	var self = this;
	self.write('<<<');
}

Log.prototype.write = function(message){
	var self = this;
	console.log(self.moment().format('HH:mm:ss') + ' ' + message);
}

Log.prototype.writeException = function(){
	var self = this;
}
