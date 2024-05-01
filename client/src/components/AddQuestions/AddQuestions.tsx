import React, { useContext, useState } from 'react';
import style from './addQuestions.module.css'
import Dropdown from '../Dropdown/Dropdown';
import { ChangeEvent } from 'react';
import { ITopic } from '../../models/ITopic';
import { Context } from '../..';

interface IAnswer {
    id: number;
    text: string;
    bool: boolean
}

const AddQuestions: React.FC = () => {
    const {store} = useContext(Context);
    const [answers, setAnswers] = useState<IAnswer[]>([{ id: 1, text: '', bool: false}]);
    const [question, setQuestion] = useState<string>('');
    const [topic, setTopic] = useState<ITopic>();


    const addAnswer = () => {
        const newAnswer = {
            id: answers.length + 1,
            text: '',
            bool: false
        };
        setAnswers([...answers, newAnswer]);
    };

    const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value);
    };
    const handleAnswerChange = (index: number, event: ChangeEvent<HTMLTextAreaElement>) => {
        const newAnswers = [...answers];
        newAnswers[index].text = event.target.value;
        setAnswers(newAnswers);
    };
    const handleAnswerBoolChange = (index: number) => {
        const newAnswers = [...answers];
        newAnswers[index].bool = !newAnswers[index].bool;
        setAnswers(newAnswers);
    }
    const handleDropdownSelect = (selectedItem: {id: number, name: string}) => {
        setTopic(selectedItem);
    };
    const handleSubmit = async () => {
        try {
            if (!topic) {
                throw new Error('Тема не выбрана');
            }
    
            await store.addQuestionWithAnswers(answers, question, topic.id);

            setAnswers([{ id: 1, text: '', bool: false }]);
            setQuestion('');
        } catch (error: any) {
            console.error('Ошибка при отправке данных на сервер:', error.message);
        }
    };

    return (
        <form className={style.form} action="questions">
            <Dropdown isSelected={handleDropdownSelect}/>
            <div className={style.center}>
                <textarea className={style.question} 
                    name='question'
                    id='question'
                    placeholder='Введите вопрос...'
                    required
                    value={question}
                    onChange={(e)=>handleQuestionChange(e)}/>
                <h2>Ответ(-ы):</h2>
                {answers.map((answer, index) => (
                    <div key={index} className={style.answers}>
                        <input checked={answer.bool} onChange={() => handleAnswerBoolChange(index)} type="checkbox" />
                        <label htmlFor={`answer-${index}`}>{index + 1}.</label>
                        <textarea
                            required
                            id={`answer-${index}`}
                            placeholder='Ответ...'
                            value={answer.text}
                            onChange={(event) => handleAnswerChange(index, event)}
                        />
                    </div>
                ))}
                <div className={`${style.btns} ${style.btns_bottom}`}>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        addAnswer();}} className={`${style.add_answres} button`}><span>+</span>Добавить ответ</button>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        handleSubmit()}} className={`${style.save} button`}>Сохранить</button>
                </div>
            </div>
            </form>
    );
}

export default AddQuestions;
