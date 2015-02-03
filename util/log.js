
exports.createLog = function(){
	return(new Log());
}

Log = function(){}

Log.prototype.write = function(message){
	console.log('time stamp ' + message);
}
