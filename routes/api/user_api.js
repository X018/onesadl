const router = require('koa-router')();
const user_ctrl = require('../../app/ctrl/user_ctrl');


router.get('/getUser', user_ctrl.getUser);
router.post('/registerUser', user_ctrl.registerUser);


module.exports = router;
