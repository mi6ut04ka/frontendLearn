import React, { useContext, useEffect, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { ITopic } from '../../models/ITopic';
import style from './editQuestions.module.css'
import SelectQuestion from '../SelectQuestion/SelectQuestion';
import { IQuestion } from '../../models/IQuestions';
import { IAnswer } from '../../models/IAnswer';
import { Context } from '../..';

const EditQuestions = () => {
    const {store} = useContext(Context);
    const [topic, setTopic] = useState<ITopic>();
    const [question, setQuestion] = useState<IQuestion>();
    const [answers, setAnswers] = useState<IAnswer[]>([]);
    useEffect(() => {
        fetchData();
    }, [question?.id]);

    const fetchData = async () => {
        if(!question?.id) return;
        try {
            const fetchedAnswers = await store.fetchAnswersByQuestion(question.id);
            setAnswers(fetchedAnswers);
        } catch (error) {
            console.error("Ошибка при получении ответов:", error);
        }
    };

    const handleDropdownSelect = (selectedItem: {id: number, name: string}) => {
        setTopic(selectedItem);
    };
    const handleQuestionSelect = (selectedItem: IQuestion) => {
        setQuestion(selectedItem);
    };
    const handleAnswerBoolChange = (index: number) => {
        if(!answers) return;
        const newAnswers = [...answers];
        newAnswers[index].bool = !newAnswers[index].bool;
        setAnswers(newAnswers);
    }
    
    return (
        <form className={style.form} action="editQuestions">
            <Dropdown isSelected={handleDropdownSelect}/>
            <SelectQuestion idtopic={topic?.id} isSelected={handleQuestionSelect}/>
            <textarea className={style.question} 
                    name='question'
                    id='question'
                    placeholder='Введите вопрос...'
                    required
                    value={question?.question}/>
            {answers && answers.map((answer, index) => {
                return(
                    <div key={index} className={style.answers}>
                        <input checked={answer.bool} onChange={() => handleAnswerBoolChange(index)} type="checkbox" />
                        <label htmlFor={`answer-${index}`}>{index + 1}.</label>
                        <textarea
                            required
                            id={`answer-${index}`}
                            placeholder='Ответ...'
                            value={answer.answer}
                            // onChange={(event) => handleAnswerChange(index, event)}
                        />
                    </div>
                )
            })}
            <button 
                    // onClick={(e)=>{
                    // e.preventDefault();
                    // handleSubmit()}} 
                    className={`${style.save} button`}>Сохранить</button>
        </form>
    );
}

export default EditQuestions;
