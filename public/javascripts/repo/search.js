var Search = (function() {
    var url = '',
        apiUrl,
        inputTxt,
        searchBtn,
        listeners = [],
        query = {
            q: 'onebitxy',
            sort: "forks",
            order: "desc",
            per_page: 100
        };

    return {
        init: function(url) {
            apiUrl = url;

            searchBtn = d3.select('#search-btn');
            inputTxt = d3.select('#search-input');
            searchBtn.on('click', function() {
                var qStr = inputTxt.property('value');
                var requestUrl = parseSearchUrl(qStr);
                console.log(requestUrl);
                listeners.forEach(function(listener) {
                    try {
                        listener(requestUrl);
                    } catch (error) {
                        console.log(error);
                    }
                })
            })
        },

        addListener: function(listener) {
            listeners.push(listener);
        }
    };

    function parseSearchUrl(qStr) {
        query.q = qStr || 'onebitxy';
        
        var arr = [];
        for (var key in query) {
            arr.push(key + '=' + query[key]);
        };

        return apiUrl + '?' + arr.join('&');
    }
}())