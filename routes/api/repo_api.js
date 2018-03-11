const router = require('koa-router')();
const repo_ctrl = require('../../app/ctrl/repo_ctrl');


router.get('/search', repo_ctrl.search);


module.exports = router;