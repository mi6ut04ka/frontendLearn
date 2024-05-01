import React, { FC, useContext, useState} from 'react';
import style from './sideNav.module.css'
import HomeSvg from '../../img/HomeSvg';
import BookOpen from '../../img/BookOpen';
import BookCheck from '../../img/BookСheck';
import UserSvg from '../../img/UserSvg';
import Check from '../../img/Check';
import logo from '../../img/logo.png'
import logout from '../../img/Sign_out.svg'
import admin from '../../img/admin.svg'
import { Link} from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const SideNav: FC = () => {
    const {store} = useContext(Context);

    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
    };

    const navItems = [
        { name: 'Домой', link: '/', icon: <HomeSvg active={activeItem === 'home'} />, key: 'home' },
        { name: 'Изучение', link: '/learn', icon: <BookOpen active={activeItem === 'learn'}/>, key: 'learn' },
        { name: 'Тесты по темам', link: '/tests', icon: <BookCheck active={activeItem === 'tests'} />, key: 'tests' },
        { name: 'Тестирование', link: '/test', icon: <Check active={activeItem === 'test'} />, key: 'test' },
        { name: 'Профиль', link: '/profile', icon: <UserSvg active={activeItem === 'profile'} />, key: 'profile' },
    ];

    return (
        <aside className={style.sideNav}>
            <div className={style.site}>
                <img className={style.logo}src={logo} alt="logo" />
                <div className={style.name}>FrontendLearn</div>
            </div>
            <ul className={style.ul}>
            {navItems.map(item => (
            <Link key={item.key} to={item.link} onClick={() => handleItemClick(item.key)}>
                <li className={activeItem !== item.key ? style.li : style.li_active}>
                    {item.icon}
                    <div className={style.nameli}>{item.name}</div>
                </li>
            </Link>
        ))}
            </ul>
            {store.user.role === 'admin'? 
            <Link onClick={() => handleItemClick('admin')} to='/adminpanel' className={style.admin}>
                <div className={activeItem !== 'admin' ? style.li : style.li_active}>
                    <img src={admin} alt="admin" />
                    <div className={style.nameli}>Admin</div>
                </div>
            </Link>
            :null}
                <div onClick={()=>store.logout()} className={style.li + ' ' + style.logout}>
                    <img src={logout} alt="logout" />
                    <div className={style.nameli}>Выход</div>
                </div>
        </aside>
    );
}

export default observer(SideNav);
