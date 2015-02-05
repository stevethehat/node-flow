var _ = require('underscore');

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
	router.addHandler('node', '/node/',
		function(context){
			var url = context.request.url.split('/');
			context.log.writef('url = "%s"', [context.request.url]);
			var action = url[2];
			var nodeUri = _.rest(url, 3);
			context.log.writef('runaction "%s"', [action]);
			context.log.writef('on "%s"', [nodeUri.join('/')]);
			
			context.contentType = 'text/json';
			context.sendResponse(
				JSON.stringify(
					{
						location: nodeUri.join('/'),
						action: action,
						data: {
							description: 'home'
						}
					}
				)
			);
		}
	);

	router.addHandler('default', '/', 
		function(context){
  			var template = require('../util/templaterenderer').createTemplateRenderer();
  			context.sendResponse(
  				template.render( 
  					{
  						'title': 'Flow'
  					} 
  				)
  			);
		}
	);
	router.start();
}
