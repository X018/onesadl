const repo_model = require('../model/repo_model');


exports.search = async (ctx, next) => {
	// ctx.body 
	const data = await repo_model.search(ctx.req.query);
	var dataSet = repo_model.treeData(data);
            // console.log(msg);
            // return msg;
            // ctx.res.json(dataSet);
            ctx.body =  dataSet;
    //         {
    //     "name": "languages",
    //     "children": []
    // }
}