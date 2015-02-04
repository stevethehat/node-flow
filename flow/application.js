
exports.createApplication = function(){
	return(new Application());
}

Application = function(){
	var self = this;
}

Application.prototype.run = function(){
	var self = this;
	var context = require('../util/context.js').createContext();
	var router = require('../util/router.js').createRouter(context);

	router.addStatic('/static', process.cwd() + '/static');
	router.addHandler('*', function(context){
		context.log.writeStartRequest();
  		var template = require('../util/templaterenderer').createTemplateRenderer();
  		context.sendResponse(
  			template.render( 
  				{
  					'title': 'Flow'
  				} 
  			)
  		);
  		context.log.writeEndRequest();
	});
	router.start();
}