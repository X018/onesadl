const repo_model = require('../model/repo_model');


exports.search = async (ctx, next) => {
	const result = await repo_model.search(ctx.req.query);
	ctx.body = repo_model.format(result.data);
}