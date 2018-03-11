const octokit = require('@octokit/rest')({
    timeout: 5000, // 0 means no request timeout
    requestMedia: 'application/vnd.github.v3+json',
    headers: {
    'user-agent': 'octokit/rest.js v1.2.3' // v1.2.3 will be current version
    },

    // change for custom GitHub Enterprise URL
    host: 'api.github.com',
    pathPrefix: '',
    // optional 
    debug: true,
    protocol: 'https',
    port: 443,

    // Node only: advanced request options can be passed as http(s) agent
    agent: undefined
})

// /**
//  * from https://www.npmjs.com/package/github
//  * @type {GitHubApi}
//  */
// var github = new GitHub({
//     // required 
//     version: "3.0.0",
//     // optional 
//     debug: true,
//     protocol: "https",
//     host: "api.github.com", // should be api.github.com for GitHub 
//     pathPrefix: "", // for some GHEs; none for GitHub 
//     timeout: 5000,
//     headers: {
//         // GitHub is happy with a unique user agent 
//         "user-agent": "ONESADL" 
//     }
// });

var repo_model = {
    /**
     * [search repos from github.com]
     * @param  {[type]}   msg      query string
     * @param  {Function} callback 
     * @return {[type]}            [void]
     */
    search: async (msg, callback) => {
        var msg = msg || {
            q: 'bitcoin',
            sort: 'forks',
            order: 'desc',
            per_page: 100
        }
        const data = await octokit.search.repos(msg);
        // octokit.search.repos(msg, function (err, data) {
            // if (err) {return console.log(err)};
            // var dataSet = treeData(data);
            // callback(null, dataSet);
            // callback(null, msg);
        // });
        //   octokit.search.repos(msg).then(function (err, data) {
        //     if (err) { console.log(err)};
            // var dataSet = treeData(data);
            // console.log(dataSet);
            return msg;
        //     // callback(null, dataSet);
        //     callback(null, msg);
        // });
    }
}

// from /public/js/utils.js
function treeData(data) {
    var languages = {};

    var result = {
        "name": "languages",
        "children": []
    }

    if (dataSet && dataSet.items) {
        var items = dataSet.items;

        items.forEach(function(item, index) {
            if (typeof languages[item.language] === "undefined") {
                languages[item.language] = index;
            };
        })

        for (var language in languages) {
            if (language === "null") {
                language = "others";
            };

            var root = {
                "name": language,
                "children": []
            };

            items.forEach(function(item, index) {
                var child = {
                    "name": item.full_name,
                    "watchers_count": item.watchers_count,
                    "forks_count": item.forks_count
                };

                if (item.language === language || (item.language === "null" && language === "others")) {
                    root.children.push(child);
                };
            })

            result.children.push(root);
        }
    }

    return result;
}

module.exports = repo_model;
