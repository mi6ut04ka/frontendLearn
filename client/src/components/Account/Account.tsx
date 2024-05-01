<<<<<<< HEAD
import React,{useContext, useRef} from 'react';
=======
import React,{useContext, useEffect, useRef, useState} from 'react';
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
import style from './account.module.css'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import pencil from '../../img/pencil.svg'
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom';
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
import Profile from '../Profile/Profile';


const Account = () => {
    const {store} = useContext(Context);

    const filePicker = useRef<HTMLInputElement>(null)
    const handlePick = () => {
<<<<<<< HEAD
        filePicker.current && filePicker.current.click();
=======
        if(filePicker.current) filePicker.current.click();
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
<<<<<<< HEAD
        const file = e.target.files && e.target.files[0];
        if (file) {
            store.uploadAvatar(file);
=======
        if (e.target.files && e.target.files.length > 0) {
            store.uploadAvatar(e.target.files[0]);
            
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
        }
    };

    return (
        <div className={style.container}>
                <div className={style.avatar}>
                    <img className={style.avatar_img} src={'http://localhost:8000/' + store.user.avatar} alt='avatar' />
<<<<<<< HEAD
                    <div onClick={handlePick} className={style.avatar_overlay}>
                        <img className={style.pencil} src={pencil} alt="change" />
=======
                    <div className={style.avatar_overlay}>
                        <img className={style.pencil} onClick={handlePick} src={pencil} alt="change" />
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
                    </div>
                <input className={style.hidden} type="file" 
                       onChange={handleFileChange}
                       accept='image/*, .png,.jpg,.web,.jpeg'
                       ref={filePicker}/>
                </div>
<<<<<<< HEAD
=======
                <nav className={style.nav}>
                    <ul>
                        <li><Link to=''>Профиль</Link></li>
                        <li><Link to=''>Статистика</Link></li>
                        <li><Link to=''>Друзья</Link></li>
                    </ul>
                </nav>
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
                <main>
                    <Profile/>
                </main>
        </div>
    );
}

export default observer(Account);
