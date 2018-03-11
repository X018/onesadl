const repo_model = require('../model/repo_model');


exports.search = async (ctx, next) => {
	ctx.body = await repo_model.search(ctx.req.query);
}