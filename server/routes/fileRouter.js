const Router = require('express')
const fileController = require('../controller/file.controller')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router();


router.post('/uploadAvatar',authMiddleware, fileController.uploadAvatar)
router.delete('/deleteAvatar',authMiddleware, fileController.deleteAvatar)

module.exports = router;