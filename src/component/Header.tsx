import React, { useState, useEffect } from 'react';
import '../style/Header.css';
 import userIcin from '../icon/user.png';
 import findIcon from '../icon/find.png';


interface headerprops{
  singup:boolean; 
  setSingUp:Function;
  login:boolean;
  setLogIn:Function;
  usermode:boolean;
  chekfavorits:Function;
}


const Header: React.FC<headerprops> = ({singup, setSingUp, login, setLogIn, usermode, chekfavorits}) => {


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


    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('address');

      chekfavorits();
      localStorage.removeItem('favorits');

      window.location.reload();
      // Additional logout actions can be added if needed
  };
  
  


    return (
    <div className='Header'>

      <>
      {usermode?
      <div className='userinhear'>
        <img className='user-icon' src={userIcin} alt='User Icon' />
        <div style={{display: 'flex', flexDirection:'column', alignItems:'flex-start'}}>
        <h2>{localStorage.getItem('user')}</h2>
        <h4>{localStorage.getItem('address')}</h4>
        </div>
      </div>:<h1 style={{margin:'0', padding:'0', position:'absolute', top:'4px', left:'25px'}}>MyShop.App</h1>
      }

      </>


      {/* <samp className='data-day'>{dayName}</samp>
      <samp className='day-all'>{day}/{month}/{year}</samp> */}


      {(!login && !singup && !usermode) &&
  <div onClick={loginbtn} className='userBtn'>
    <samp><img width={30} src={userIcin} alt='user icon' /></samp>
    <samp>Login</samp>
  </div>
}

{usermode &&
  <div style={{padding:'3px 8px '}} onClick={logout} className='userBtn'>
    <samp>Log Out</samp>
  </div>
}

    <div style={{
        position:'absolute',
        bottom:'2px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    }}>
      <input style={{
        padding: '10px',
        textAlign:'center',
        width:'80%'
      }} type='text' placeholder='Find Product'  />
      <img style={{cursor:'pointer'}} width={30} src={findIcon} alt='find icon' />
    </div>
      
    </div>
  );
}

export default Header;
