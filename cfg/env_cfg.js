var env_dev = require('./env_dev');
var env_test = require('./env_test');

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    dev: env_dev,
    test: env_test
}[process.env.NODE_ENV || "dev"]
