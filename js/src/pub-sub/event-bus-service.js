window.app.eventBusService = function(){
	
	var publish = function(eventName, data) {
		console.log(eventName);
		console.log(data);
	};
	
	
	return { 
		publish: publish
	}
	
}();