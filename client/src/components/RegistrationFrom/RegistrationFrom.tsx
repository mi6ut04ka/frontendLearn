import React, { FormEventHandler, useContext, useState } from 'react';
import { Context } from '../..';
import style from './RegistrationFrom.module.css'
import { useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png'

const RegistrationFrom = () => {
    const [error, setError] = useState('')
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const handlerSubmit: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const name = formData.get('name') as string

        await store.registration(email, password, name).catch(error => setError(error.message));
        if(store.isAuth) navigate('/')

    }

    return (
        <div className={style.registrationForm}>
            <div>
                <img alt='logo' src={logo} className={style.logo}></img>
                <div className={style.text}>Регистрация в FrontendLearn</div>
            </div>
            <form className={style.form} onSubmit={handlerSubmit} action="registration">
            <input className={style.input}
                type="text" 
                placeholder='Ваше имя'
                name='name' />
                <input className={style.input}
                type="email" 
                placeholder='Введите email'
                name='email' 
                required/>
                <input className={style.input}
                type="password" 
                placeholder='Введите пароль' 
                name='password'
                required/>
                <div className={style.error}>{error}</div>
                <button className={style.button}>Зарегистрироваться</button>
                <div className={style.personal}>
                    <input className={style.check} type="checkbox" required/>
                    Согласие на обработку персональных данных</div>
            </form>
            
        </div>
    );
}

export default RegistrationFrom;


