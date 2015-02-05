var _ = require('underscore');

exports.createApplication = function(){
	return(new Application());
}

Application = function(){
	var self = this;
	self.context = require('../util/context.js').createContext();
	self.hierarchy = require('../flow/hierarchy.js').createHierarchy(self.context);
}

Application.prototype.run = function(){
	var self = this;
	var router = require('../util/router.js').createRouter(self.context);

	router.addStatic('/static', process.cwd() + '/static');
	router.addHandler('node', '/node/',
		function(context){
			var url = context.request.url.split('/');
			context.log.writef('url = "%s"', [context.request.url]);
			var action = url[2];
			var nodeUri = _.rest(url, 3).join('/');
			context.log.writef('runaction "%s"', [action]);
			context.log.writef('on "%s"', [nodeUri]);

			self.hierarchy.getNode(nodeUri,
				function(node){
					node.runAction(action,
						function(actionResult){
							context.contentType = 'text/json';
							context.sendResponse(JSON.stringify(actionResult));
						}
					);
				}
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
