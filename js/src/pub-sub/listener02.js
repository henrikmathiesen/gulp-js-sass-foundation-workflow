(function(){
	
	var onItemAdded = function(data){
		console.log("x");
		
		switch (data) {
			case 1:
				$('[data-add-name-to-array-button]').css('outline', '1px solid yellow');
				break;
			case 2:
				$('[data-add-name-to-array-button]').css('outline', '2px solid yellow');
				break;
			case 3:
				$('[data-add-name-to-array-button]').css('outline', '3px solid yellow');
				break;
			default:
				$('[data-add-name-to-array-button]').css('outline', '4px solid yellow');
				break;
		}
	};
	
	window.app.eventBusService.subscribe('itemAdded', onItemAdded);
	
})();