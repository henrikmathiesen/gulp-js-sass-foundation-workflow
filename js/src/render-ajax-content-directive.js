(function () {

	$('[data-render-ajax-content]').on('click', function (e) {
		e.preventDefault();

		var $renderContentSelector = $($(this).attr('data-render-container'));
		var mustacheTemplate = window.app.mtEvent();

		// Ajax Content is rendered, no need to fetch and render on subsequent clicks
		if ($renderContentSelector.find('>h2').length) { return; }
		
		$.get('http://localhost:1338/getevents')
				.then(function (data) {
					$renderContentSelector.html(Mustache.render(mustacheTemplate, data[0]));
				});

	});

})();