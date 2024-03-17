import React, { useState, useEffect } from 'react';import logo from './logo.svg';
import '../style/UserConteiner.css';

import UserIcon from '../icon/user.png';
import AddIcon from '../icon/add.png';
import CreatNewUser from './CreatNewUser';


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
      
              <CreatNewUser />
        
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
