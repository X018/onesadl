// 开发环境的配置内容
const env_dev = {
    env: 'DEVELOPEMENT',//环境名称
    port: 8081,         //服务端口号
    mongodb_url: '',    //数据库地址
    redis_url:'',       //redis地址
    redis_port: ''      //redis端口号
};

// 测试环境的配置内容
const env_test = {
    env: 'TEST',		//环境名称
    port: 8082,         //服务端口号
    mongodb_url: '',    //数据库地址
    redis_url:'',       //redis地址
    redis_port: ''      //redis端口号
};


//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    dev: env_dev,
    test: env_test
}[process.env.NODE_ENV || "dev"]
