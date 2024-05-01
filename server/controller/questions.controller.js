const ApiError = require('../exeptions/api-error')
const questionService = require('../service/questions-service')

class QuestionsContoller{
    async addQuestion(req, res, next){
        try{
            const {id_category,question} = req.body;

            const data = await questionService.addQuestion(id_category, question);

            return res.json(data)
        }catch(e){
            next(e)
        }
    }
    async getTopics(req, res, next){
        try{
            const data = await questionService.getTopics();

            return res.json(data)

        }catch(e){
            next(e)
        }
    }

    async addAnswer(req, res, next){
        try{
            const {answer, bool, id_question} = req.body;

            const data = await questionService.addAnswer(answer, bool, id_question);

            return res.json(data)

        }catch(e){
            next(e)
        }
    }

    async addQuestionWithAnswers(req, res, next){

        try{
            const {answers, question, topic} = req.body;

            const data = await questionService.addQuestionWithAnswers(answers,question,topic);

            return res.json(data)

        }catch(e){
            next(e)
        }
    }

    async getQuestionsByTopic(req, res, next){
        try{
            const id = req.params.id;
            const data = await questionService.getQuestionsByTopic(id);

            return res.json(data)

        }catch(e){
            next(e)
        }
    }
    async getAnswersByQuestion(req, res, next){
        try{
            const id = req.params.id;
            const data = await questionService.getAnswersByQuestion(id);

            return res.json(data)

        }catch(e){
            next(e)
        }
    }
}


module.exports = new QuestionsContoller();