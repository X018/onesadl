(function() {
    var SEARCH_API = 'http://127.0.0.1:8081/api/repo/search';
    var loading = document.getElementById("onesadl");

    Search.init(SEARCH_API);

    Bar.init("TOP DEV LANGUAGES", "#barId");


    function show(url) {
        url = url || SEARCH_API;

        var loader = setTimeout(function() {
            loading.style.display = "block";
        }, 300);

        d3.json(url, function(err, result) {
            if (err) {
                clearTimeout(loader);
                loading.style.display = "none";
                alert("LOAD ERROR! CHECK NETWORK...")
            };

            var data = result.data;
            Bar.show(Utils.getBarData(data));

            clearTimeout(loader);
            loading.style.display = "none";
        });
    }

    Search.addListener(function(url) {
        show(url);
    })

    show();
})()