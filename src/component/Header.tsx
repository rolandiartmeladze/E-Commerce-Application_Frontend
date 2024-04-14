import React, { useState, useEffect } from 'react';
import '../style/Header.css';
 import userIcin from '../icon/user.png';
 import findIcon from '../icon/find.png';
import styled from 'styled-components';

interface headerprops{
  singup:boolean; 
  setSingUp:Function;
  login:boolean;
  setLogIn:Function;
  usermode:boolean;
  chekfavorits:Function;
}

const SearchContainer = styled.div`
  position: absolute;
  bottom: 5px;
  display: flex;
  width: 98%;
  justify-content: center;
  margin:auto;
  @media screen and (max-width: 550px) {
    width: 96%;
  }

`;

const StyledInput = styled.input`
  padding: 10px;
  text-align: center;
  width: 80%;
  border: 1px solid #daac;
  border-radius: 5px;
  backdrop-filter: blur(8px); 
  background-color: rgba(255, 255, 255, 0.3);
  outline: none;
  transition: 0.4s ease-in-out;


  &::placeholder { 
  font-weight: 800;
}
&:focus {
  background-color: rgba(255, 255, 255, 0.7);
}
  
  `;

const StyledButton = styled.button`
  background-color: rgba(255, 255, 255, 0.6); 
  border: none;
  padding: 2px 15px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9); 
  }
`;

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
  
  const handleFindButtonClick = () => {
    // Add functionality for the find button click
    console.log('Find button clicked');
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
  <div style={{padding:'3px 8px ', right:'12px'}} onClick={logout} className='userBtn'>
    <samp>Log Out</samp>
  </div>
}

 {!usermode && (
        <SearchContainer>
          <StyledInput type='text' placeholder='Find Product' />
          <StyledButton onClick={handleFindButtonClick}>
            {/* <img width={30} src={findIcon} alt='find icon' /> */}
            {'Find'}
          </StyledButton>
        </SearchContainer>
      )}      
    </div>
  );
}

export default Header;
