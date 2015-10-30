(function () {

	$('[data-truncate-at-word]').each(function (index, element) {

		var cap = parseInt($(element).attr('data-truncate-at-word'));
		
		// Get all words in text
		var words = $(element).text().split(" ");
		
		// Word count does not exceed cap, or cap does not include any words, so we do not continue
		if (words.length <= cap || cap < 1) { return; }
		
		// Return 'first word' to 'word before cap int' (since zero index based it will include word at cap in one index based)
		// Example: cap = 2 , ['lorem', 'ipsum'], will return word 0 and word 1
		words = words.slice(0, cap);
		
		// Remove any delimiter characters from last word (last word will have three dots)
		words[cap - 1] = words[cap - 1]
			.replace(".", "")
			.replace(",", "")
			.replace("!", "")
			.replace("?", "")
			.replace(":", "")
			.replace(";", "");
		
		// Join sliced array to create the truncated string
		words = words.join(" ");

		words += "...";

		$(element).text(words);

	});

})();