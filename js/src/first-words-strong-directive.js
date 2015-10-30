(function () {

	// If using EPiServer, I recommend letting an editor do this instead

	$('div[data-first-words-in-p-tags-strong]').each(function (directiveIndex, directiveElement) {

		// Bold first word at the start of string
		
		// $(directiveElement).find('p').each(function () {
		// 	var pdata = $(this);
		// 	pdata.html(pdata.text().replace(/(^\w+)/, '<strong>$1</strong>'));
		// });

		
		// Bold n words at the start of string

		var numberOfWordsToStrong = parseInt($(directiveElement).attr('data-first-words-in-p-tags-strong'));

		$(directiveElement).find('p').each(function (index, element) {

			var pContent = $(element).html();
			pContent = pContent.split(" ");

			pContent[0] = '<strong>' + pContent[0];
			pContent[numberOfWordsToStrong - 1] = pContent[numberOfWordsToStrong - 1] + '</strong>';

			pContent = pContent.join(" ");
			$(element).html(pContent);

		});

	});


})();