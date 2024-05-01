import React from 'react';
import style from './search.module.css'
import search from '../../img/Search.svg'

const Search = () => {
    return (
        <div className={style.searchPanel}>
            <img src={search} alt="search" />
            <input className={style.search} type="search" placeholder='Поиск...' />
        </div>
    );
}

export default Search;
