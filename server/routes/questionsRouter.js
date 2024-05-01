const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const questionsContoller = require('../controller/questions.controller')


const router = new Router();

router.get('/topics',authMiddleware, questionsContoller.getTopics)
router.post('/add',authMiddleware,roleMiddleware('admin'),questionsContoller.addQuestion)
router.post('/addanswer',authMiddleware,roleMiddleware('admin'),questionsContoller.addAnswer)
router.post('/addQuestionWithAnswers', authMiddleware,roleMiddleware('admin'),questionsContoller.addQuestionWithAnswers)
router.get('/getquestionsbytopic/:id',authMiddleware,roleMiddleware('admin'),questionsContoller.getQuestionsByTopic)
router.get('/getanswersbyquestion/:id',authMiddleware,roleMiddleware('admin'),questionsContoller.getAnswersByQuestion)





module.exports = router;