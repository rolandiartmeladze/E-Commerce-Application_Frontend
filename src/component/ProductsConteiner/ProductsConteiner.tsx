import React, { useState } from 'react';
import './ProductsConteiner.css';
import styled from 'styled-components';


import UserIcon from '../../icon/addproperties.png';

import AddNewProduct from '../CreatNewProduct/AddNewProduct';
import Loaing from '../Loading';
import AddProductBtn from './AddProductBtn';

interface UserContainerProps {
        setUserData: Function;
        setAdvanceData: Function;
        advanceData: object;
        userData: any[];
        Adduser?: any;
        loading: boolean;
        setLoading: Function;
        fetchData: Function;
        findstatus: boolean;
        setFindStatus: Function;
        notfound:boolean;
        setNotound: Function;
        findInput:string;
        setFindInput: Function;    

      }

      const LoadConteiner = styled.div`
                position: absolute;
                width: 100%;
                height: 100%;
                backdrop-filter: blur(5.5px);
                bottom: 0;
                top: 55px;
                font-size: 200%;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-direction: column;
                z-index: 5;
    `;
    



function ProductsConteiner({
        fetchData, 
        loading, 
        setLoading, 
        userData, 
        setUserData, 
        advanceData, 
        setAdvanceData,
        findstatus,
        setFindStatus,
        notfound,
        setNotound,
        findInput,
        setFindInput
    
  
  
}: UserContainerProps) {

        const [product, setProduct] = useState(false);


        const serverUrl = "https://dry-shore-70664-df3b504ad877.herokuapp.com";



        const addProductFunction = () => {setProduct(prevProduct => !prevProduct);};


                const closefinde = () => {
                            setFindStatus(false)
                            setNotound(false);
                            fetchData();
                            setFindInput('');
                        }


                        const [selectedUser, setSelectedUser] = useState(null);

                        const SelectProduct = async (UserID: string) => {
                                console.log(UserID);

                                try {

                                        const usersResponse = await fetch(`${serverUrl}/selected`, {
                                          method: 'GET',
                                          headers: {
                                              'Content-Type': 'application/json'
                                          },
                                      });
                                          if (!usersResponse.ok) {throw new Error('Failed to fetch users data');}
                                          const usersData = await usersResponse.json();
                                          setUserData(usersData);
                                    
                                      const advanceResponse = await fetch(`${serverUrl}/checkAdvance`, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                    });
                                          if (!advanceResponse.ok) {throw new Error('Failed to fetch advance data');}
                                          const advanceData = await advanceResponse.json();
                                          setAdvanceData(advanceData[0]);
                                        setLoading(false)
                                    } catch (error) {
                                        console.error('Error fetching user data:', error);
                                      }
                              
                                

                            };                        

return (
<>
<div style={{position: 'relative'}}  className='userTable'>

{notfound? <LoadConteiner style={{height: '200px'}} > {" product No found "} <button onClick={closefinde}>close</button></LoadConteiner> : null }
{loading ? <Loaing />:null}


        <AddNewProduct fetchData={fetchData}
                product={product} 
                setProduct={setProduct}  
                addProductFunction={addProductFunction} 
                setUserData={setUserData}  
                advanceData={advanceData} 
                setAdvanceData={setAdvanceData} />

        {findstatus? 
                <div className='find-result-btn-coneiner'>
                <samp className='find-result-btn-coneiner-title'> Found 
                <samp className='find-result-btn-coneiner-result-count'>{userData.length}</samp> 
                products </samp> 
                <samp onClick={closefinde} className='closeFindeBtn'>Close Finde</samp>
                </div>:null
}

               
              
                        
        
  
<AddProductBtn  addProductFunction={addProductFunction} product={product} />
        
      
      
      { 
      userData.map((item, index) => (

        <div onClick={() => { SelectProduct(item._id) }}  key={item._id} className='userConteinet'>

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
                
      ))

      }


      </div>
</>
        );
}

export default ProductsConteiner;
