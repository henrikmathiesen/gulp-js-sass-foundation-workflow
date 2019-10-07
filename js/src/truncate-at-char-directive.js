(function () {
	
	// It is easier logic, and easier to read for the user, if we truncate by words instead
	// See truncate-at-word.directive.js
	// Also see ^ for CSS implementation

	$('[data-truncate-at-char]').each(function (index, element) {
		var cap = parseInt($(element).attr('data-truncate-at-char'));

		var text = $(element).text();
		
		// Text does not exceed cap, or cap does not include any characters, so we do not continue
		if (text.length <= cap || cap < 1) { return; }
		
		// Return 'first character' to 'character before cap int' (since zero index based it will include char at cap in one index based)
		text = text.slice(0, cap);
		
		// Remove any delimiter characters from last character (last character will have three dots)
		var textEndsInDot = text.charAt(cap - 1) === ".";
		var textEndsInComma = text.charAt(cap - 1) === ",";
		var textEndsInExpoint = text.charAt(cap - 1) === "!";
		var textEndsInQmark = text.charAt(cap - 1) === "?";
		var textEndsInColon = text.charAt(cap - 1) === ":";
		var textEndsInSemi = text.charAt(cap - 1) === ";";
		
		if(textEndsInDot || textEndsInComma || textEndsInExpoint || textEndsInQmark || textEndsInColon || textEndsInSemi) {
			text = text.slice(0, - 1);
		}
			
		text += "...";

		$(element).text(text);

	});

})();
