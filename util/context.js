// basic helper class

exports.createContext = function(){
	return(new Context());
}

Context = function(){
	var self = this;
	self.log = require('./log.js').createLog(self);
	self.log.write('creating context');
}

Context.prototype.test = function(){

}