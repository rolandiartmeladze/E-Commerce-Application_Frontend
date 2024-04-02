import React, { useState, useEffect } from 'react';
import '../style/Header.css';
 import userIcin from '../icon/user.png';
 import locIcon from '../icon/loc1.png';

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

      <>
      <div className='userinhear'>
        <img className='user-icon' src={userIcin} alt='User Icon' />
        <div style={{display: 'flex', flexDirection:'column', alignItems:'flex-start'}}>
          <h2>Roland Artmeladze</h2>
          <h4>Georgia, Tsalka, Tbeti</h4>


      {/* <samp className='data-day'>{dayName}</samp>
      <samp className='day-all'>{day}/{month}/{year}</samp> */}
 </div>

      </div>
      </>


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
