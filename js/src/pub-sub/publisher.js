(function(){
	
	var $field = $('[data-add-name-to-array-field]');
	var $button = $('[data-add-name-to-array-button]');
	
	var items = [];
	
	$button.on('click', function(){
		if($field.val()) {
			items.push($field.val());
			window.app.eventBusService.publish("itemAdded", items.length);
		}
		else {
			console.log("No item to push");
		}
	});
	
})();