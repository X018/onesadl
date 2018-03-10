/**
* 自定义Api异常
*/
const code = require('./error_code')
const error_msg = require('./error_msg')


class ApiError extends Error {
	// 构造方法
	constructor(err_code) {
		super();
		this.code = err_code;
		this.msg = error_msg[err_code] || error_msg[code.UNKNOW_ERROR];
	}
}


module.exports = ApiError;