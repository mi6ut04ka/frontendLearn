import React, { FC, useEffect, useState } from 'react';

interface IProps{
  active: boolean
}

const BookCheck = (props : IProps) => {
  const [firstColor, setfirstColor] = useState('');
    const [secondColor, setSecondColor] = useState('');

    useEffect(()=>{
      if(props.active){
        setfirstColor('#B1B1B1');
        setSecondColor('#FFFFFF');
      }else{
        setfirstColor('#3A4C47');
        setSecondColor('#A9BBB6');
      }

    },[props.active])
    return (
        <svg
          width='35'
          height='35'
          viewBox="0 0 35 35"
          xmlns="http://www.w3.org/2000/svg"
          fill={secondColor}
        >
        <rect x="5.83325" y="4.375" width="23.3333" height="26.25" rx="2" 
        fill={secondColor}/>
        <path d="M5.83325 27.7083C5.83325 26.8546 5.83325 26.4277 5.96144 26.0872C6.16432 25.5481 6.58972 25.1227 7.12875 24.9198C7.46934 24.7917 7.8962 24.7917 8.74992 24.7917H25.1666C27.0522 24.7917 27.995 24.7917 28.5808 24.2059C29.1666 23.6201 29.1666 22.6773 29.1666 20.7917V20.4167V26.625C29.1666 28.5106 29.1666 29.4534 28.5808 30.0392C27.995 30.625 27.0522 30.625 25.1666 30.625H8.74992C7.8962 30.625 7.46934 30.625 7.12875 30.4968C6.58972 30.2939 6.16432 29.8685 5.96144 29.3295C5.83325 28.9889 5.83325 28.562 5.83325 27.7083Z" 
        fill={firstColor}/>
        <path d="M13.8542 15.3125L16.6648 18.1231C16.7234 18.1817 16.8184 18.1817 16.877 18.1231L22.6042 12.3958" 
        stroke={"#3A4C47"}
        strokeWidth="1.2"/>
        </svg>
      );
    }

export default BookCheck;
