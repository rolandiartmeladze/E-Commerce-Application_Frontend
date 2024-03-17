import React, { useState, useEffect } from 'react';import logo from './logo.svg';
import '../style/UserConteiner.css';
import styled from 'styled-components';


import UserIcon from '../icon/user.png';
import AddIcon from '../icon/add.png';
import CreatNewUser from './CreatNewUser';


const AddRemoveBtn = styled.div`
  font-size: 130%;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 5px;
  cursor: pointer;
  top: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  backdrop-filter: blur(5px);
  box-shadow: 1px 1px 3px black;
  transition: 0.3s ease-in-out;
  &:hover{
        box-shadow: -1px 1px 3px white;
        color: red;
  }
`;


function UserConteiner() {

        const [addUser, setAddUser] = useState(true);

        const clickfunction = () => {
                addUser ? setAddUser(false) : setAddUser(true);
            };
            
           


                  return (
<>
<div  className='userTable'>

{ addUser?  <div  onClick={clickfunction} className='userConteinet'>
      
      <div style={{justifyContent: 'center'}} className='userHeaderline'>
        <img src={UserIcon} alt='User Icon' />
      </div>
    
      <div style={{
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom:'15px'
        }} className='userInfoLine'>
                <h3  style={{margin:'0'}}>Add User</h3>
                <img src={AddIcon} alt='User Icon' />
      </div>
    


              </div>
              :       <div  style={{minHeight: '140px', cursor: 'default'}} className='userConteinet'>
                <>
                        <AddRemoveBtn style={{ }}
                                onClick={clickfunction} 
                                > 
                        X  
                        </AddRemoveBtn>

              <CreatNewUser />
                        </>

        </div>
  
}
 

      
              <div className='userConteinet'>
      
      <div className='userHeaderline'>
        <img src={UserIcon} alt='User Icon' />
        <samp>Test User 01 <h3>Tsalka</h3></samp>
            <div className='headerMore'>...</div>
      </div>
    
      <div className='userInfoLine'>
                <samp><h1>რაოდენობა</h1> <h3>125.50  ლ.</h3></samp>
                <samp><h1>ფასი</h1><h3>1.40   ₾.</h3></samp>
      </div>
    
      <div className='userTotal'> 
      <samp>
        <h2>ღირებულება: <samp>{125.50 * 1.4} ₾.</samp></h2>
      </samp>
      </div>


              </div>
      
      
      </div>
</>
        );
}

export default UserConteiner;
