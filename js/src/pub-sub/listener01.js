(function(){
	
	var onItemAdded = function(event, data){
		switch (data) {
			case 1:
				$('[data-add-name-to-array-field]').css('outline', '1px solid red');
				$(document).off('itemAdded', onItemAdded);
				break;
			case 2:
				$('[data-add-name-to-array-field]').css('outline', '2px solid red');
				break;
			case 3:
				$('[data-add-name-to-array-field]').css('outline', '3px solid red');
				break;
			default:
				$('[data-add-name-to-array-field]').css('outline', '4px solid red');
				break;
		}
	};
	
	//window.app.eventBusService.subscribe('itemAdded', onItemAdded);
	$(document).on('itemAdded', onItemAdded);
	
})();