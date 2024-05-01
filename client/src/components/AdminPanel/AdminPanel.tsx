import React, { useContext, useState } from 'react';
import style from './adminPanel.module.css'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { Navigate } from 'react-router-dom';
import AddQuestions from '../AddQuestions/AddQuestions';
import EditQuestions from '../EditQuestions/EditQuestions';


const AdminPanel = () => {
    const {store} = useContext(Context)
    const [activeItem, setActiveItem] = useState('add');
    if(store.user.role !== 'admin'){
        return <Navigate to="/" replace />;
    }
    
    return (
        <div className={style.admin}>
            <div className={style.btns}>
                <button onClick={()=>setActiveItem('add')} className={`button ${style.btn} ${activeItem === 'add'? null: style.passive}`}>Добавить вопрос</button>
                <button onClick={()=>setActiveItem('edit')} className={`button  ${activeItem === 'edit'? null: style.passive}`}>Редактировать вопрос</button>
            </div>
            {activeItem === 'add'? <AddQuestions/> : <EditQuestions/>}
        </div>
    );
}

export default observer(AdminPanel);
