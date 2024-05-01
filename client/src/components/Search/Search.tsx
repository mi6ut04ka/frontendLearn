import React from 'react';
import style from './search.module.css'
import search from '../../img/Search.svg'

const Search = () => {
    return (
        <div className={style.searchPanel}>
            <img src={search} alt="search" />
<<<<<<< HEAD
            <input className={style.search} type="search" placeholder='Поиск...' />
=======
            <input className={style.search} type="text" placeholder='Поиск...' />
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
        </div>
    );
}

export default Search;
