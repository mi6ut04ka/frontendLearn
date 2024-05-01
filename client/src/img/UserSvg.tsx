import React, { FC, useEffect, useState } from 'react';

interface IProps{
  active: boolean
}

const UserSvg = (props : IProps) => {
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
        >
        <path d="M4.375 12.375C4.375 8.60376 4.375 6.71815 5.54657 5.54657C6.71815 4.375 8.60376 4.375 12.375 4.375H22.625C26.3962 4.375 28.2819 4.375 29.4534 5.54657C30.625 6.71815 30.625 8.60376 30.625 12.375V22.625C30.625 26.3962 30.625 28.2819 29.4534 29.4534C28.2819 30.625 26.3962 30.625 22.625 30.625H12.375C8.60376 30.625 6.71815 30.625 5.54657 29.4534C4.375 28.2819 4.375 26.3962 4.375 22.625V12.375Z" 
        fill={secondColor}/>
        <circle cx="17.5001" cy="14.5833" r="5.83333" 
        fill={firstColor}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M27.6936 30.149C27.7011 30.2684 27.6198 30.3752 27.5024 30.3984C26.3562 30.625 24.8059 30.625 22.625 30.625H12.375C10.1943 30.625 8.64406 30.625 7.49782 30.3985C7.38043 30.3753 7.29916 30.2685 7.30663 30.149C7.595 25.5379 12.0485 21.875 17.5001 21.875C22.9517 21.875 27.4052 25.5379 27.6936 30.149Z" fill="#3A4C47"/>
        </svg>
      );
    }

export default UserSvg;
