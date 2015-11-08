(function(){
	
	$('[data-render-ajax-content]').on('click', function(e){
		e.preventDefault();
		
		var $renderContentSelector = $(this).attr('data-render-ajax-content');
		$renderContentSelector = $('[' + $renderContentSelector + ']');
		
		
		
	});
	
})();