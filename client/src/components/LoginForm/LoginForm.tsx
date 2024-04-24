import React, { FormEventHandler, useContext, useState, FC} from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import styles from './loginForm.module.css';
import logo from '../../img/logo.png'
import { Link, useNavigate } from 'react-router-dom';


const LoginForm: FC = () => {
    const [error, setError] = useState('')
    const {store} = useContext(Context)
    const navigate = useNavigate();
    
    const handlerSubmit: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        await store.login(email, password).catch(error => setError(error.message));
        if(store.isAuth) navigate('/')
    }


    return (
        <div  className={styles.loginForm}>
            <div>
                <img alt='logo' src={logo} className={styles.logo}></img>
                <div className={styles.text}>Вход в FrontendLearn</div>
            </div>
            <form onSubmit={handlerSubmit} className={styles.form} action="login">
                <input className={styles.input}
                type="email"
                name='email'
                placeholder='Введите email' 
                required/>
                <input className={styles.input} 
                type="password" 
                placeholder='Введите пароль' 
                name='password'
                required/>
                <div className={styles.error}>{error}</div>
                <button className={styles.button}>Войти</button>
            </form>
            <div>Нет аккаунта?
                <Link to='/registration' className={styles.registration}>Зарегистрируйтесь</Link>
            </div>
        </div>
    );
}

export default observer(LoginForm);
