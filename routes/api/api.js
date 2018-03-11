const router = require('koa-router')();
const user_api = require('./user_api');
const repo_api = require('./repo_api');


router.prefix('/api')

router.use('/user', user_api.routes(), user_api.allowedMethods());
router.use('/repo', repo_api.routes(), repo_api.allowedMethods());


module.exports = router;