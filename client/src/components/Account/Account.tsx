import React,{useContext, useEffect, useRef, useState} from 'react';
import style from './account.module.css'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import pencil from '../../img/pencil.svg'
import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';


const Account = () => {
    const {store} = useContext(Context);

    const filePicker = useRef<HTMLInputElement>(null)
    const handlePick = () => {
        if(filePicker.current) filePicker.current.click();
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            store.uploadAvatar(e.target.files[0]);
            
        }
    };

    return (
        <div className={style.container}>
                <div className={style.avatar}>
                    <img className={style.avatar_img} src={'http://localhost:8000/' + store.user.avatar} alt='avatar' />
                    <div className={style.avatar_overlay}>
                        <img className={style.pencil} onClick={handlePick} src={pencil} alt="change" />
                    </div>
                <input className={style.hidden} type="file" 
                       onChange={handleFileChange}
                       accept='image/*, .png,.jpg,.web,.jpeg'
                       ref={filePicker}/>
                </div>
                <nav className={style.nav}>
                    <ul>
                        <li><Link to=''>Профиль</Link></li>
                        <li><Link to=''>Статистика</Link></li>
                        <li><Link to=''>Друзья</Link></li>
                    </ul>
                </nav>
                <main>
                    <Profile/>
                </main>
        </div>
    );
}

export default observer(Account);
