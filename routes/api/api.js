const router = require('koa-router')();
const user_api = require('./user_api');


router.prefix('/api')

router.use('/user', user_api.routes(), user_api.allowedMethods());


module.exports = router;