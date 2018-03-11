const router = require('koa-router')()
const app_ctrl = require('../app/ctrl/app_ctrl')


router.get('/', app_ctrl.app)


module.exports = router
