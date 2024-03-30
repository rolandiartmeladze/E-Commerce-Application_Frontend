import React, { useState, useEffect } from 'react';import logo from './logo.svg';
import '../style/Header.css';


interface headerprops{
  singup:boolean; 
  setSingUp:Function;
}


const Header: React.FC<headerprops> = ({singup, setSingUp}) => {


  const singupbtn = () =>{
         !singup? setSingUp(true):setSingUp(false)
  }
        const [today, setToday] = useState(new Date());
      
        useEffect(() => {
          const intervalId = setInterval(() => {
            setToday(new Date());
          }, 1000);
                return () => clearInterval(intervalId);
        }, []);

        const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

    const day = today.getDate();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();  

    return (
    <div className='Header'>
      <h2>{dayName}</h2>
      <h1>{day}/{month}/{year}</h1>
      <div onClick={singupbtn} className='Meniu-Btn'>
       {!singup? 'Sing Up' : 'Close'}
      </div>
    
      
    </div>
  );
}

export default Header;
