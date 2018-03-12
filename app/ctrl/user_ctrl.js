const ApiError = require('../error/ApiError')
const api_code = require('../error/error_code')


//获取用户
exports.getUser = async (ctx, next) => {
	var uid = ctx.query.uid || 0;
	if (uid == 0) {
		throw new ApiError(api_code.USER_NOT_EXIST);
	}
    ctx.body = {
        username: 'karst.xia',
      	uid: uid,
        age: 30
    }
}

//用户注册
exports.registerUser = async (ctx, next) => {
    console.log('registerUser', ctx.request.body);
}