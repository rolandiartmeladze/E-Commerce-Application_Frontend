import React, { useState } from 'react';
import '../style/UserConteiner.css';
import styled from 'styled-components';


import UserIcon from '../icon/user.png';
import AddIcon from '../icon/add.png';
import CreatNewUser from './CreatNewUser';
import ChangeAdvenceInfo from './ChangeAdvenceInfo';


interface UserContainerProps {
        setUserData: React.Dispatch<React.SetStateAction<any[]>>
        setAdvanceData: React.Dispatch<React.SetStateAction<any[]>>
        advanceData: object;
        userData: any[];
      }



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

const AddUserHead = styled.div`
        flex-direction:  column;
        align-items:  center;
        margin-bottom: 15px;
        h3{margin: 0;}
`;


function UserConteiner({userData, setUserData, advanceData, setAdvanceData}: UserContainerProps) {
        const { currency } = advanceData as { currency: string };
        const { quantity } = advanceData as { quantity: string };


        const [addUser, setAddUser] = useState(true);

        const clickfunction = () => {
                addUser ? setAddUser(false) : setAddUser(true);
            };
           
            console.log(advanceData)
                  return (
<>
<div  className='userTable'>

<ChangeAdvenceInfo />


{ addUser?  

        <div onClick={clickfunction} className='userConteinet'>

                <div style={{justifyContent: 'center'}} className='userHeaderline'>
                        <img src={UserIcon} alt='User Icon' />
                </div>
    
                        <AddUserHead className='userInfoLine'>
                                        <h3>Add User</h3>
                                        <img src={AddIcon} alt='User Icon' />
                        </AddUserHead>

        </div>
              :       
              <div  style={{minHeight: '140px', cursor: 'default'}} className='userConteinet'>
                <>
                        <AddRemoveBtn onClick={clickfunction}> X </AddRemoveBtn>

                              <CreatNewUser userData={userData} setUserData={setUserData} />
                        </>
                        
        </div>
  
}
        
      
      
      { userData.length > 0 ?  userData.map((item, index) => (

        <div  key={item._id} className='userConteinet'>

                <div className='userHeaderline'>
                        <img src={UserIcon} alt='User Icon' />
                        <samp>{item.name} <h3>{item.address}</h3></samp>
                        <div className='headerMore'>...</div>
                </div>
        
                        <div className='userInfoLine'>
                                <samp><h1>რაოდენობა</h1> <h3>{item.quantity} {quantity}</h3></samp>
                                <samp><h1>ფასი</h1><h3> {item.price}  {currency}</h3></samp>
                        </div>
        
                                <div className='userTotal'> 
                                <samp>
                                        <h2>ღირებულება: <samp>{(item.quantity * item.price).toFixed(1)} {currency}</samp></h2>
                                </samp>
                                </div>

        </div>
                
      )):


      // სატესტო მომხმარებელი როდესაც ბაზა ცარიელია

      <div className='userConteinet'>
      
      <div className='userHeaderline'>
        <img src={UserIcon} alt='User Icon' />
        <samp>Test User 01 <h3>Tsalka</h3></samp>
            <div className='headerMore'>...</div>
      </div>
    
      <div className='userInfoLine'>
                <samp><h1>რაოდენობა</h1> <h3>0 ლ.</h3></samp>
                <samp><h1>ფასი</h1><h3>0 ₾.</h3></samp>
      </div>
    
      <div className='userTotal'> 
      <samp>
        <h2>ღირებულება: <samp>0 ₾.</samp></h2>
      </samp>
      </div>


       </div>


      }


      </div>
</>
        );
}

export default UserConteiner;
