(function(){
	
	window.app.eventBusService.subscribe('itemAdded', function(data){
		
		switch (data) {
			case 1:
				$('[data-add-name-to-array-button]').css('outline', '1px solid green');
				break;
			case 2:
				$('[data-add-name-to-array-button]').css('outline', '2px solid green');
				break;
			case 3:
				$('[data-add-name-to-array-button]').css('outline', '3px solid green');
				break;
			default:
				$('[data-add-name-to-array-button]').css('outline', '4px solid green');
				break;
		}
		
	});
	
})();