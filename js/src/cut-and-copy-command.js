(function(){

    $('[data-click-to-copy]').on('click', function(e){
        e.preventDefault();

        var $selectorToCopy = $($(e.target).attr('copy-selector'));
        
        var range = document.createRange();
        range.selectNode($selectorToCopy[0]);
        window.getSelection().addRange(range);

        try {
            var success = document.execCommand('copy');
            console.log(success ? "copy success" : "copy fail");
        } 
        catch (error) {
            console.log("ERROR copy text: " + error);
        }

        window.getSelection().removeAllRanges(); 
    });

})();