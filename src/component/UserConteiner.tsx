import React, { useState } from 'react';
import '../style/UserConteiner.css';
import styled from 'styled-components';


import UserIcon from '../icon/user.png';
import AddIcon from '../icon/add.png';
import CreatNewUser from './CreatNewUser';
import ChangeAdvenceInfo from './ChangeAdvenceInfo';
import Addnewuser from '../component/Addnewuser';

interface UserContainerProps {
        setUserData: React.Dispatch<React.SetStateAction<any[]>>
        setAdvanceData: React.Dispatch<React.SetStateAction<any[]>>
        advanceData: object;
        userData: any[];
        // Adduser: any[];
        Adduser?: any;
      }



const AddUserHead = styled.div`
        flex-direction:  column;
        align-items:  center;
        margin-bottom: 15px;
        h3{margin: 0;}
`;


function UserConteiner({userData, setUserData, advanceData, setAdvanceData}: UserContainerProps) {

        const [product, setProduct] = useState(false);
        const [updateAdvance, setUpdateAdvance] = useState(false);

        const addProductFunction = () => {
        if(updateAdvance){setUpdateAdvance(false)};
                setProduct(prevProduct => !prevProduct); 
                };

return (
<>
<div  className='userTable'>


<Addnewuser 
updateAdvance={updateAdvance} 
setUpdateAdvance={setUpdateAdvance}  
product={product} setProduct={setProduct}  
addProductFunction={addProductFunction} 
setUserData={setUserData}  
advanceData={advanceData} 
setAdvanceData={setAdvanceData} 
/>

  

        <div onClick={addProductFunction} style={{border: product? '2px rgb(37, 6, 211) solid':'none'}} className='userConteinet'>

                <div style={{justifyContent: 'center'}} className='userHeaderline'>
                <img src={UserIcon} alt='User Icon' />
                </div>
    
                        <AddUserHead className='userInfoLine'>
                        <h3>Add Product</h3>
                        <img src={AddIcon} alt='User Icon' />
                        </AddUserHead>

        </div>
               
              
                        
        
  

        
      
      
      { userData.length > 0 ?  userData.map((item, index) => (

        <div  key={item._id} className='userConteinet'>

                <div className='userHeaderline'>
                        <img src={UserIcon} alt='User Icon' />
                        <samp>{item.Name} <h3>{item.Address}</h3></samp>
                        <div className='headerMore'>...</div>
                </div>
        
                        <div className='userInfoLine'>
                                <samp><h1>რაოდენობა</h1> <h3>{item.Quantity} {item.Quantityiunit}</h3></samp>
                                <samp><h1>ფასი</h1><h3> {item.Price}  {item.Currency}</h3></samp>
                        </div>
        
                                <div className='userTotal'> 
                                <samp>
                                        <h2>ღირებულება: <samp>{(item.Quantity * item.Price).toFixed(1)} {item.Currency}</samp></h2>
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
