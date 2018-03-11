const repo_model = require('../model/repo_model');


exports.search = async (ctx, next) => {
	repo_model.search(ctx.req.query.query, 
		function(err, data) {
            res.json(data);
        })
}