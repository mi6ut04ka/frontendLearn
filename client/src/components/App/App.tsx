import React, { FC, useContext, useEffect} from 'react';
import style from './App.module.css';
import { Route, Routes } from "react-router-dom";
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import SideNav from '../SideNav/SideNav';
import RegistrationFrom from '../RegistrationFrom/RegistrationFrom';
import LoginForm from '../LoginForm/LoginForm';
import Account from '../Account/Account';
import Header from '../Header/Header';
import Spinner from '../Spinner';
<<<<<<< HEAD
import AdminPanel from '../AdminPanel/AdminPanel';
=======
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c

const App: FC = () => {
  const{store} = useContext(Context);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
<<<<<<< HEAD
    if(store.isAuth){
      store.fetchTopics();
    }
    },[store.isAuth]);
=======
    },[]);
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c

  return (
      <div className={style.app} >
        <div className={style.layout}>
          <SideNav />
          <main className={style.main}>
          {store.isLoading? <Spinner/> : null}
          <Header/>
            <Routes>
                  <Route path='/registration' element={<RegistrationFrom/>}/>
                  <Route path='/login' element={<LoginForm/>}/>
                  <Route path='/account' element={<Account/>}/>
<<<<<<< HEAD
                  <Route path='/adminpanel' element={<AdminPanel/>}/>
=======
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
            </Routes>
          </main>
        </div>
        
      </div>
  );
}

export default observer(App);
