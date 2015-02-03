// basic helper class

exports.createContext = function(){
	return(new Context());
}

Context = function(){
	this.Log = require('./log.js').createLog();
	this.Log.write('creating context');
}

Context.prototype.test = function(){

}