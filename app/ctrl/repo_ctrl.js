const repo_model = require('../model/repo_model');


exports.search = async (ctx, next) => {
	var query = {
        q: ctx.query.q || 'blockchain',
        sort: ctx.query.sort || 'forks',
        order: ctx.query.order || 'desc',
        per_page: ctx.query.per_page || 100
    };
	const result = await repo_model.search(query);
	ctx.body = repo_model.format(result.data);
}