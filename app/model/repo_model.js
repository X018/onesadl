const octokit = require('@octokit/rest')({
    timeout: 5000, // 0 means no request timeout
    requestMedia: 'application/vnd.github.v3+json',
    headers: {
        'user-agent': 'octokit/rest.js v1.2.3' // v1.2.3 will be current version
    },
    agent: undefined // Node only: advanced request options can be passed as http(s) agent
})


var repo_model = {
    /**
     * [search repos from github.com]
     * @param  {[type]}   condition      query string
     * @return {[type]}   [void]
     */
    search: async (condition) => {
        let cond = condition || {
            q: 'blockchain',
            sort: 'forks',
            order: 'desc',
            per_page: 100
        }
        return await octokit.search.repos(cond);
    },

    /**
     * [format result of search repos]
     * @param  {[type]}   data      
     * @return {[type]}   [void]
     */
    format: function(data) {
        var result = {
            "name": "languages",
            "children": []
        }
        var languages = {};
        if (data && data.items) {
            var items = data.items;
            items.forEach(function(item, index) {
                if (typeof languages[item.language] === "undefined") {
                    languages[item.language] = index;
                };
            })

            for (let language in languages) {
                if (language === "null") {
                    language = "others";
                }
                var root = {
                    "name": language,
                    "children": []
                };
                items.forEach(function (item, index) {
                    var child = {
                        "name": item.full_name,
                        "forks_count": item.forks_count,
                        "watchers_count": item.watchers_count
                    };

                    if (item.language === language || (item.language === "null" && language === "others")) {
                        root.children.push(child);
                    }
                })
                result.children.push(root);
            }
        }
        return result;
    }
}


module.exports = repo_model;
