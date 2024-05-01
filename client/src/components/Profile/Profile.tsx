import React, { FormEventHandler, useContext, useState } from 'react';
import style from './profile.module.css'
import { Context } from '../..';

const Profile = () => {
    const {store} = useContext(Context);
    const [error, setError] = useState('')

    const handlerSubmit: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();
    }

    return (
        <div className={style.wrapper}>
            <form onSubmit={handlerSubmit} className={style.form} action="changeUserData">
                <h2>Профиль</h2>
                <input name='name' type="text" className={style.name} placeholder={store.user.name || 'Ваше имя'} />
                <div className={style.block_email}>
                    <div className={style.email}>{store.user.email}</div>
                    <div className={style.isActivated}>{store.user.isActivated? 'Почта подтверждена':'Почта не подтверждена'}</div>
                    <button className={style.acceptEmail}>Подтвердить почту</button>
                </div>
                <div className={style.block_password}>
                <div className={style.change_password}>Сменить пароль</div>
                <div className={style.password}>
                    <input name='oldPassword' type="password" placeholder='Старый пароль'/>
                    <input name='newPassword' type="password" placeholder='Новый пароль'/>
                </div>
                </div>
                <button className={style.save}>Сохранить</button>
            </form>
        </div>
    );
}

export default Profile;
