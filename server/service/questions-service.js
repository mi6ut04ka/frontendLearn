const db = require('../db')

class QuestionService{
    async addQuestion(id_category,question){
        const res = await db.query('INSERT INTO questions (id_category, question) values ($1,$2) RETURNING *',[id_category, question])
        return res.rows[0]
    }

    async getTopics(){
        const res = await db.query('SELECT * FROM category')
        
        return res.rows
    }

    async addAnswer(answer, bool, id_question){
        const res = await db.query('INSERT INTO answers (answer, bool, id_question) values ($1,$2,$3) RETURNING *',[answer, bool, id_question]);
        return res.rows[0]
    }

    async addQuestionWithAnswers(answers/*[{bool, text}]*/, question /*string*/ , topic){
        const questionRes = await db.query('INSERT INTO questions (id_category, question) VALUES ($1, $2) RETURNING id', [topic, question]);
        const questionId = questionRes.rows[0].id;
        const answerPromises = answers.map(async (answer) => {
            const res = await db.query('INSERT INTO answers (answer, bool, id_question) VALUES ($1, $2, $3) RETURNING *', [answer.text, answer.bool, questionId]);
            return res.rows[0];
        });

        const answerResults = await Promise.all(answerPromises);

        return {
            id: questionId,
            question: question,
            topic: topic,
            answers: answerResults
        };
    }

    async getQuestionsByTopic(id){
        const questionsData = await db.query('SELECT * FROM questions WHERE id_category = $1',[id])
        return questionsData.rows
    }

    async getAnswersByQuestion(id){
        const answersData = await db.query('SELECT * FROM answers WHERE id_question = $1',[id])
        return answersData.rows
    }
}

module.exports = new QuestionService();