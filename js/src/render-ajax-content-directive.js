(function () {

	$('[data-render-ajax-content]').on('click', function (e) {
		e.preventDefault();

		var $renderContentSelector = $($(this).attr('data-render-ajax-container'));
		var mustacheTemplate =  eval($(this).attr('data-render-ajax-mustache-template'));
		var cacheType = $(this).attr('data-render-ajax-cache-type');
		
		
		var getAndRenderAjaxData = function(){
			$.get('http://localhost:1338/getevents')
				.then(function (data) {
					$renderContentSelector.html(Mustache.render(mustacheTemplate, data[0]));
				});	
		};
		
		switch(cacheType) {
			case "":
				// No caching - always make ajax call when link is clicked
				console.log("No caching");
				getAndRenderAjaxData();
				break;
			case "js":
				// Caching with javascript construct
				// ...
				console.log("JS caching");
				break;
			default:
				// Caching with selector check - if selector is in DOM, then no need to make ajax call again
				console.log("Selector caching");
				if ($renderContentSelector.children($(cacheType)).length) { return; }
				getAndRenderAjaxData();
				break;
		}


		if((cacheType !== "js") || (cacheType !== "")) {
			
			// Ajax Content is rendered, no need to fetch and render on subsequent clicks
			if ($renderContentSelector.children($(cacheType)).length) { return; }
			
		}

		
		

	});

})();