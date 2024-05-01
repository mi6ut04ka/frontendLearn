/* eslint-disable no-useless-concat */
import React, { useContext } from 'react';
import Search from '../Search/Search';
import { Context } from '../..';
import style from './header.module.css'
import { Link } from 'react-router-dom';
import bell from '../../img/Bell.svg'
import setting from '../../img/setting.svg'
import { observer } from 'mobx-react-lite';

const Header = () => {
    const {store} = useContext(Context)
    const content = () => store.isAuth? 
    <div className={style.info}>
        <div className={style.user}>
            <div className={style.name}>{store.user.name}</div>
            {store.user.avatar? 
            <img className={style.avatar} src={process.env.REACT_APP_SERVER_URL + store.user.avatar} alt="Avatar" />:
            <div className={style.avatar}>{store.user.name ? store.user.name[0].toUpperCase() : ""}</div> }
        </div>
        <div className={style.notice + ' ' + style.isNotice}>
                <img src={bell} alt="bell" />
        </div>
        <div className={style.settings}>
                <img src={setting} alt="bell" />
        </div>
    </div> :
    <div className={style.btns}>
        <Link to='/login'><button className='button'>Войти</button></Link>
        <Link to='/registration'><button className='button'>Регистрация</button></Link>
    </div>
    return (
        <div className={style.header}>
            <Search />
            {content()}
        </div>
    );
}

export default observer(Header);
