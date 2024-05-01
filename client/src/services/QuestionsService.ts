import $api from "../http";

export default class QuestionsService{
    static async addQuestionWithAnswers(answers: {bool: boolean, text: string}[],question: string,topic:number){
        return $api.post('/questions/addQuestionWithAnswers',{answers,question,topic})
    }
}