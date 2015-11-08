window.app.mtEvent = function(){
	var mustacheInlineTemplate = "<h2>Name: {{ name }} </h2>";
	mustacheInlineTemplate += "<h3>Sessions</h3>";
	mustacheInlineTemplate += "<ul>";
	mustacheInlineTemplate += "{{#sessions}}<li>{{name}}</li>{{/sessions}}";
	mustacheInlineTemplate += "</ul>"
	
	return mustacheInlineTemplate;
};