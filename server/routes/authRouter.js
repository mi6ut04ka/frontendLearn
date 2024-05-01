const authController = require('../controller/auth.controller')
const Router = require('express')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')


const router = new Router();

router.post('/registration',
    [check('email', 'Введите корректный email').isEmail(),
    check('password', 'Пароль должен состоять не менее чем из 8 символов').isLength({min:8})
    ],authController.registation)
router.post('/login',[check('email', 'Введите корректный email').isEmail()],authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)
router.post('/updatepassword',[
    check('newPassword', 'Пароль должен содержать не менее 8 символов').isLength({min:8})
],authMiddleware,authController.updatePassword)

module.exports = router;