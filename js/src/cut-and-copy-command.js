(function () {

    var $copyDirective = $('[gs-click-to-copy]');
    var $cutDirective = $('[gs-click-to-cut]');  

    if(!document.queryCommandSupported('copy')) {
        $copyDirective.css('display', 'none');    
    }

    if(!document.queryCommandSupported('cut')) {
        $cutDirective.css('display', 'none');    
    }

    $copyDirective.on('click', function (e) {
        e.preventDefault();

        var $selectorToCopy = $($(e.target).attr('gs-target'));

        var range = document.createRange();
        range.selectNode($selectorToCopy[0]);
        window.getSelection().addRange(range);

        try {
            var success = document.execCommand('copy');
            console.log("copy " + (success ? "success" : "fail"));
        }
        catch (error) {
            console.log("ERROR copy text: " + error);
        }

        window.getSelection().removeAllRanges();
    });

    $cutDirective.on('click', function (e) {
        e.preventDefault();

        var $selectorToCopy = $($(e.target).attr('gs-target'));
        $selectorToCopy[0].select();

        try {
            var success = document.execCommand('cut');
            console.log("cut " (success ? "success" : "fail"));
        } catch (error) {
            console.log("ERROR cutting text: " + error);
        }

        // cut throws an exception, but still works
        // Browser support: IE 10+, Chrome 43+, Firefox 41+, and Opera 29+ support these commands. Not Safari.

    });

})();