import React, { useState, useEffect } from 'react';
import '../style/Header.css';
 import userIcin from '../icon/user.png';
 import findIcon from '../icon/find.png';
import styled from 'styled-components';
import serverUri from '../component/serverUrl';

const serverlink = serverUri();


interface HeaderProps {
  singup: any; // Define type for singup
  setSingUp: any; // Define type for setSingUp
  login: any; // Define type for login
  setLogIn: any; // Define type for setLogIn
  usermode: boolean; // Define type for usermode
  chekfavorits: any; // Define type for chekfavorits
  findstatus: boolean; // Define type for findstatus
  setFindStatus: any; // Define type for setFindStatus
  loading: boolean; // Define type for loading
  setLoading: any; // Define type for setLoading
  userData: any; // Define type for userData
  setUserData: any; // Define type for setUserData
  notfound: boolean; // Define type for notfound
  setNotound: any; // Define type for setNotound
  findInput: string; // Define type for findInput
  setFindInput: any; // Define type for setFindInput
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

const Header: React.FC<HeaderProps> = ({singup, setSingUp, login, setLogIn, usermode, chekfavorits,
  findstatus,
  setFindStatus,
  loading, 
  setLoading, 
  userData, 
  setUserData ,
  notfound,
  setNotound,
  findInput,
  setFindInput

}) => {


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

  const findRequest = async () => {

    if(findInput.length >0){

    setLoading(true);
        try {
                const FindInput = findInput;
                const findProduct = await fetch(`${serverlink}/findProduct?FindInput=${FindInput}`, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                });
                if (!findProduct.ok) {throw new Error('Failed to fetch users data');}
                const findResult = await findProduct.json();
                setUserData(findResult);
                if(findResult.length === 0){ setNotound(true); setFindStatus(false); }
                else{setNotound(false);}                  

            } 
        catch (error) {console.error( error);} 
        finally { setLoading(false);  if(userData.length > 0){setFindStatus(true)} }
    }
    else{

        const input: HTMLInputElement | null = document.getElementById("FindProduct") as HTMLInputElement;
        if(input){
        input.style.borderColor = "red";
        input.placeholder = "Enter a search term";
        setTimeout(() => {
            input.style.borderColor = "black";
            input.placeholder = "search term";

        }, 500);
        }
        
    }

};

  
  const handleFindButtonClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add functionality for the find button click
      const newValue = e.target.value;
      setFindInput(newValue);

  };

  

    const home = () => {
      window.location.reload();
    }


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
      </div>:<h1 onClick={home} style={{margin:'0', cursor: 'pointer', padding:'0', position:'absolute', top:'4px', left:'25px'}}>MyShop.App</h1>
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
          <StyledInput id='FindProduct' 
                  onChange={handleFindButtonClick} 
                  value={findInput} 
      
          type='text' placeholder='Find Product' />
          <StyledButton  onClick={findRequest}>
            {/* <img width={30} src={findIcon} alt='find icon' /> */}
            {'Find'}
          </StyledButton>
        </SearchContainer>
      )}      
    </div>
  );
}

export default Header;
