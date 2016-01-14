(function () {
    
    $('html').on('mousemove',
        $.debounceFirst(3000, function () {
            $('[data-debounce-first]').append('<div>Mouse move</div>');
        })
    );
    
    $('html').on('mousemove',
        $.debounceLast(3000, function () {
            $('[data-debounce-last]').append('<div>Mouse move</div>');
        })
    );

    $('html').on('mousemove',
        $.throttle(3000, function () {
            $('[data-throttle').append('<div>Mouse move</div>');
        })
    );

})();