import React,{useContext, useRef} from 'react';
import style from './account.module.css'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import pencil from '../../img/pencil.svg'
import Profile from '../Profile/Profile';


const Account = () => {
    const {store} = useContext(Context);

    const filePicker = useRef<HTMLInputElement>(null)
    const handlePick = () => {
        filePicker.current && filePicker.current.click();
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            store.uploadAvatar(file);
        }
    };

    return (
        <div className={style.container}>
                <div className={style.avatar}>
                    <img className={style.avatar_img} src={'http://localhost:8000/' + store.user.avatar} alt='avatar' />
                    <div onClick={handlePick} className={style.avatar_overlay}>
                        <img className={style.pencil} src={pencil} alt="change" />
                    </div>
                <input className={style.hidden} type="file" 
                       onChange={handleFileChange}
                       accept='image/*, .png,.jpg,.web,.jpeg'
                       ref={filePicker}/>
                </div>
                <main>
                    <Profile/>
                </main>
        </div>
    );
}

export default observer(Account);
