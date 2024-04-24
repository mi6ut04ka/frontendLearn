import React, { FC, useContext, useState} from 'react';
import style from './sideNav.module.css'
import HomeSvg from '../../img/HomeSvg';
import BookOpen from '../../img/BookOpen';
import BookCheck from '../../img/BookСheck';
import UserSvg from '../../img/UserSvg';
import Check from '../../img/Check';
import logo from '../../img/logo.png'
import logout from '../../img/Sign_out.svg'
import { Link} from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const SideNav: FC = () => {
    const {store} = useContext(Context);

    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
    };


    return (
        <aside className={style.sideNav}>
            <div className={style.site}>
                <img className={style.logo}src={logo} alt="logo" />
                <div className={style.name}>FrontendLearn</div>
            </div>
            <ul className={style.ul}>
                <Link onClick={()=>handleItemClick('home')} to='/'>
                    <li className={activeItem !== 'home'? style.li : style.li_active}>
                        <HomeSvg active={activeItem === 'home'? true: false}/>
                        <div className={style.nameli}>Домой</div>
                    </li>
                </Link>
                <Link onClick={()=>handleItemClick('learn')} to='/learn'>
                    <li className={activeItem !== 'learn'? style.li : style.li_active}>
                        <BookOpen active={activeItem === 'learn'? true: false}/>
                        <div className={style.nameli}>Изучение</div>
                    </li>
                </Link>
                <Link onClick={()=>handleItemClick('tests')} to='/tests'>
                    <li className={activeItem !== 'tests'? style.li : style.li_active}>
                        <BookCheck active={activeItem === 'tests'? true: false}/>
                        <div className={style.nameli}>Тесты по темам</div>
                    </li>
                </Link>
                <Link onClick={()=>handleItemClick('test')} to='/test'>
                    <li className={activeItem !== 'test'? style.li : style.li_active}>
                        <Check active={activeItem === 'test'? true: false}/>
                        <div className={style.nameli}>Тестирование</div>
                    </li>
                </Link>
                <Link onClick={()=>handleItemClick('profile')} to='/profile'>
                    <li className={activeItem !== 'profile'? style.li : style.li_active}>
                        <UserSvg active={activeItem === 'profile'? true: false}/>
                        <div className={style.nameli}>Профиль</div>
                    </li>
                </Link>
            </ul>
                <div onClick={()=>store.logout()} className={style.li + ' ' + style.logout}>
                    <img src={logout} alt="logout" />
                    <div className={style.nameli}>Выход</div>
                </div>
        </aside>
    );
}

export default observer(SideNav);
