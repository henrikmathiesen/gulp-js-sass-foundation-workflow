app.eventBusService = function(){
	
	var _events = {};
	
	// Also called "on"
	var subscribe = function(eventName, callback) {
		_events[eventName] = _events[eventName] || [];
		_events[eventName].push(callback);
	};
	
	// Also called "off" (unsubscribing is iffy)
	var unsubscribe = function(eventName, callback){
		if(_events[eventName]) {
			for (var index = 0; index < _events[eventName].length; index++) {
				if(_events[eventName][index] === callback) {
					_events[eventName].splice(index, 1);
					break;
				}
			}
		}
	};
	
	// Also called "emit" or "trigger"
	var publish = function(eventName, data) {
		if(_events[eventName]) {
			_events[eventName].forEach(function(storedCallback){
				storedCallback(data);
			});
		}
	};
	
	return { 
		publish: publish,
		subscribe: subscribe,
		unsubscribe: unsubscribe
	}
	
}();