const Router = require('express')
const userController = require('../controller/users.controller')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const router = new Router();

router.get('/users',roleMiddleware('admin'),authMiddleware,userController.getUsers)
router.post('/changename', authMiddleware, userController.changeName)


module.exports = router;