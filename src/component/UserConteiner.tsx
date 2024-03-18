import React, {useContext, useState, useEffect } from 'react';import logo from './logo.svg';
import '../style/UserConteiner.css';
import styled from 'styled-components';


import UserIcon from '../icon/user.png';
import AddIcon from '../icon/add.png';
import ArrowRigth from '../icon/arrow.png';
import CreatNewUser from './CreatNewUser';

interface UserContainerProps {
        dataResponse: any[]; 
        setDataResponse: React.Dispatch<React.SetStateAction<any[]>>
      }

      const InputItem = styled.input`
                margin-bottom: 4px;
                padding: 6px;
                padding-left: 10px;
                background: none;
                backdrop-filter: blur(0.8px);
                box-shadow: -0.3px -0.6px 3px 0.3px red inset;
                outline: none;
                border: none;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                font-weight: 700;
    `;
    const CreacUserBtn = styled.div`
                padding: 2px;
                border-radius: 50%;
                position: relative;
                cursor: pointer;
                transition: 0.3 ease-in-out;
                box-shadow: 0.5px 0.5px 2px 0.2px green;
                display: flex;
                float: right;
                margin: 10px;
                margin-left: 4px;
                &:hover{
                        box-shadow: 0.8px 0.8px 6px 0.5px red;
                }
    `;


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


function UserConteiner({ dataResponse, setDataResponse }: UserContainerProps) {

        const [addUser, setAddUser] = useState(true);
        const [updateAdvance, setUpdateAdvance] = useState(false);

        const clickfunction = () => {
                addUser ? setAddUser(false) : setAddUser(true);
            };

            const updateAdvanceFunction = () => {
                updateAdvance ? setUpdateAdvance(false) : setUpdateAdvance(true);
            };
            
           

                  return (
<>
<div  className='userTable'>

<div className = {!updateAdvance? 'update-advanse' : 'update-advanse update-advanse-active'}>

        <h1 className={'update-advanse-head'} onClick={updateAdvanceFunction}>
         <samp style={{ padding:'7px'}}> Change Advance User Info</samp><samp style={{display: 'flex'}}> <img className={ !updateAdvance ? ' aarowRight' :' aarowRight aarowRight-active'} src={ArrowRigth} alt="" /></samp>
        </h1>
                        <section className = {
                                !updateAdvance? 
                                'change-info-conteiner' : 
                                'change-info-conteiner-active change-info-conteiner' 
                                }>
                                <article>
                                        <h1>
                                                                                      Basice User Info
                                        </h1>

                                        <form style={{
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: '8px'
}}>


        <div>
<InputItem name='userName'
          type='text'
          placeholder='Full Name'
        //   value={userName}
        //   onChange={(e) => setUserName(e.target.value)} 
        />
        <samp>X</samp>
        
        </div>

      <InputItem name='userAddress'
                type='text'
                placeholder='Address'
                // value={userAddress}
                // onChange={(e) => setUserAddress(e.target.value)} 
                />
<InputItem name='userName'
          type='text'
          placeholder='User Email'
        //   value={userName}
        //   onChange={(e) => setUserName(e.target.value)} 
        />

      <InputItem name='userAddress'
                type='text'
                placeholder='User Phone'
                // value={userAddress}
                // onChange={(e) => setUserAddress(e.target.value)} 
                />
<div style={{width: '100%', display:'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
<samp>Add More</samp>
<CreacUserBtn>
        <img style={{width: '25px'}} src={AddIcon} alt="add info" />
</CreacUserBtn>

</div>



</form>


                                </article>
                                <article>
                                        <h1>
                                                 Currency/Quantity
                                        </h1>
                                       
                                        </article>
                                <article>
                                        <h1>
                                                Product Cost
                                        </h1>
                                        
                                        </article>
                        </section>
        </div>

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

                              <CreatNewUser dataResponse={dataResponse}  setDataResponse={setDataResponse} />
                        </>

        </div>
  
}
        
      
      
      { dataResponse.length > 0 ?   dataResponse.map((item, index) => (

        <div  key={item._id} className='userConteinet'>

                <div className='userHeaderline'>
                        <img src={UserIcon} alt='User Icon' />
                        <samp>{item.name} <h3>{item.address}</h3></samp>
                        <div className='headerMore'>...</div>
                </div>
        
                        <div className='userInfoLine'>
                                <samp><h1>რაოდენობა</h1> <h3>{item.raodenoda} ლ.</h3></samp>
                                <samp><h1>ფასი</h1><h3>{item.fasi}  ₾.</h3></samp>
                        </div>
        
                                <div className='userTotal'> 
                                <samp>
                                        <h2>ღირებულება: <samp>{item.raodenoda * item.fasi} ₾.</samp></h2>
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
