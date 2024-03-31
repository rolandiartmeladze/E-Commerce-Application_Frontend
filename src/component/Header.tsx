import React, { useState, useEffect } from 'react';
import '../style/Header.css';
 import userIcin from '../icon/user.png';

interface headerprops{
  singup:boolean; 
  setSingUp:Function;
  login:boolean;
  setLogIn:Function;
}


const Header: React.FC<headerprops> = ({singup, setSingUp, login, setLogIn}) => {


  const singupbtn = () =>{
         !singup? setSingUp(true):setSingUp(false);
  }
  const loginbtn = () =>{
    !login? setLogIn(true):setLogIn(false);
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

{!login && !singup? <div  onClick={loginbtn} className='userBtn'>
  <samp><img width={30} src={userIcin} alt='user icon' /></samp><samp>Login</samp>
</div>
: null }
{/* <div  onClick={loginbtn} className='userBtn'>
  <samp><img width={30} src={userIcin} alt='user icon' /></samp><samp>Login</samp>
</div> */}

      {/* <div onClick={singupbtn} className='Meniu-Btn'>
       {!singup? 'Sing Up' : 'Close'}

      </div> */}
    
      
    </div>
  );
}

export default Header;
