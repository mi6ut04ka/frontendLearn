import React, { FC, useContext, useState} from 'react';
import style from './sideNav.module.css'
import HomeSvg from '../../img/HomeSvg';
import BookOpen from '../../img/BookOpen';
import BookCheck from '../../img/BookСheck';
import UserSvg from '../../img/UserSvg';
import Check from '../../img/Check';
import logo from '../../img/logo.png'
import logout from '../../img/Sign_out.svg'
<<<<<<< HEAD
import admin from '../../img/admin.svg'
=======
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
import { Link} from 'react-router-dom';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const SideNav: FC = () => {
    const {store} = useContext(Context);

    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
    };

<<<<<<< HEAD
    const navItems = [
        { name: 'Домой', link: '/', icon: <HomeSvg active={activeItem === 'home'} />, key: 'home' },
        { name: 'Изучение', link: '/learn', icon: <BookOpen active={activeItem === 'learn'}/>, key: 'learn' },
        { name: 'Тесты по темам', link: '/tests', icon: <BookCheck active={activeItem === 'tests'} />, key: 'tests' },
        { name: 'Тестирование', link: '/test', icon: <Check active={activeItem === 'test'} />, key: 'test' },
        { name: 'Профиль', link: '/profile', icon: <UserSvg active={activeItem === 'profile'} />, key: 'profile' },
    ];
=======
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c

    return (
        <aside className={style.sideNav}>
            <div className={style.site}>
                <img className={style.logo}src={logo} alt="logo" />
                <div className={style.name}>FrontendLearn</div>
            </div>
            <ul className={style.ul}>
<<<<<<< HEAD
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
=======
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
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
                <div onClick={()=>store.logout()} className={style.li + ' ' + style.logout}>
                    <img src={logout} alt="logout" />
                    <div className={style.nameli}>Выход</div>
                </div>
        </aside>
    );
}

export default observer(SideNav);
