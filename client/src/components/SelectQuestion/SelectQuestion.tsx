import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../..';
import style from '../Dropdown/Dropdown.module.css'
import { IQuestion } from '../../models/IQuestions';
interface IProps{
    idtopic: number | undefined
    isSelected: (selectedItem:IQuestion) => void
}
const SelectQuestion : React.FC<IProps> = (props) => {
    const {store} = useContext(Context);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<{id: number, text: string}>({ id: 0, text: '' });
    const [questionsData,setQuestionsData] = useState<IQuestion[]>();

    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      useEffect(() => {
        fetchData();
    }, [props.idtopic]);// eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = async () => {
        if(!props.idtopic) return;
        setQuestionsData(await store.fetchQuestionsByTopic(props.idtopic));
    };

    const handleItemClick = (question: IQuestion) => {
      setSelectedItem({id: question.id, text: question.question});
      setIsOpen(false);
      props.isSelected(question);
    };
  
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  
    
  
    return (
      <div ref={dropdownRef} style={{width: 500}} className={style.dropdown}>
        <div className={style.input}>
          <input
              required
              className={`${style.input} button`}
              type="text"
              value={selectedItem.text}
              placeholder="Выбрать вопрос"
              onFocus={() => setIsOpen(true)}
              readOnly
          />
          <span onClick={()=>setIsOpen(true)} style={isOpen? {backgroundColor: '#DFDFDF'}:{backgroundColor: '#F2F2F2'}} className={style.arrow}></span>
        </div>
        {isOpen && (
          <div className={style.isOpen}>
            {questionsData?.map((question)=>{
              return(
                <div key={question.id} className={style.isSelected} onClick={() => handleItemClick(question)}>{question.question}</div>
              )
            })}
          </div>
        )}
      </div>
    );
  };

export default SelectQuestion;
