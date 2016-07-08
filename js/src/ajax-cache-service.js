app.ajaxCacheService = function(){
	
	var _ajaxCache = [];

    var checkIfItemIsInCache = function (item) {
        for (var i = 0; i < _ajaxCache.length; i += 1) {
            if (_ajaxCache[i].cachedItem === item) {
                return true;
            }
        }
        return false;
    };

    var pushToCache = function (item, response) {
        _ajaxCache.push({ cachedItem: item, cachedResponse: response });
    };

    var pullFromCache = function (item) {
        for (var i = 0; i < _ajaxCache.length; i += 1) {
            if (_ajaxCache[i].cachedItem === item) {
                return _ajaxCache[i].cachedResponse;
            }
        }
        return false;
    };


    return {
        checkIfItemIsInCache: checkIfItemIsInCache,
        pushToCache: pushToCache,
        pullFromCache: pullFromCache
    };
	
}();