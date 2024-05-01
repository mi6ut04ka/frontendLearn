import React, { useState, useRef, useEffect, useContext } from 'react';
import style from './Dropdown.module.css'
import { Context } from '../..';

interface IProps{
  isSelected: (selectedItem: {id: number, name: string}) => void;
}

const Dropdown: React.FC<IProps> = (props) => {
  const {store} = useContext(Context);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<{id: number, name: string}>({ id: 0, name: '' });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (id: number, name: string) => {
    setSelectedItem({ id, name });
    setIsOpen(false);
    props.isSelected({ id, name });
  };


  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={style.dropdown}>
      <div className={style.input}>
        <input
            required
            className={`${style.input} button`}
            type="text"
            value={selectedItem.name}
            placeholder="Выбрать тему"
            onFocus={() => setIsOpen(true)}
            readOnly
        />
        <span onClick={()=>setIsOpen(true)} style={isOpen? {backgroundColor: '#DFDFDF'}:{backgroundColor: '#F2F2F2'}} className={style.arrow}></span>
      </div>
      {isOpen && (
        <div className={style.isOpen}>
          {store.topics.map(({id, name})=>{
            return(
              <div key={id} className={style.isSelected} onClick={() => handleItemClick(id, name)}>{name}</div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;