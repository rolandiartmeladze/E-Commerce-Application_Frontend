import React, { useState } from 'react';

import './ProductsConteiner.css';
import '../UsersComponent/SingUp.css';
import styled from 'styled-components';




import AddNewProduct from '../CreatNewProduct/AddNewProduct';
import Loaing from '../Loading';
import AddProductBtn from './AddProductBtn';
import testimg from '../../img/slide_9.jpg';
import SingUp from '../UsersComponent/SingUp';
import AllProductsConteiner from './AllProductConteiner';
import MyProducts from './MyProducts';
import Login from '../UsersComponent/LogIn';



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
        isselected:boolean; 
        setIsSelected:Function;
        setSelectedUser:Function;
        selectedUser:any;
        soldAmount:any;
        setSoldAmount:Function;
        singup:boolean; 
        setSingUp:Function;
        inUerMode:boolean;
        setInUserMode:Function;
        product:any[];
        setProduct:Function;
    
        login:boolean;
        setLogIn:Function;
    
        activeuser:object
        setActiveUser:Function;
    
      
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
    


    interface FormDataprops {
        name: string;
        email: string;
        phone: string;
        password: string;
    }
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
        setFindInput,
        isselected, 
        setIsSelected,
        setSelectedUser,
        selectedUser,
        soldAmount,
        setSoldAmount,
        singup, 
        setSingUp,
        inUerMode,
        setInUserMode,
    
        product, 
        setProduct,

        login,
        setLogIn,
    

        activeuser,
        setActiveUser
    
  
}: UserContainerProps) {



        const serverUrl = "https://dry-shore-70664-df3b504ad877.herokuapp.com";



        const addProductFunction = () => {product? setProduct(false):setProduct(true)};


                const closefinde = () => {
                            setFindStatus(false)
                            setNotound(false);
                            fetchData();
                            setFindInput('');
                        }



                            


                            const usermode = () => {
                                inUerMode? setInUserMode(false):setInUserMode(true)
                            } 
                            

return (
<>

{/* <button onClick={usermode}>{!inUerMode? 'myroom' : 'all users mode'}</button> */}

{!singup && !login ?
<div style={{position: 'relative'}}  className='userTable'>

{/* {notfound? <LoadConteiner style={{height: '200px'}} > {" product No found "} <button onClick={closefinde}>close</button></LoadConteiner> : null }
{loading ? <Loaing />:null} */}


        <AddNewProduct fetchData={fetchData}
                product={product} 
                setProduct={setProduct}  
                addProductFunction={addProductFunction} 
                setUserData={setUserData}  
                advanceData={advanceData} 
                setAdvanceData={setAdvanceData} 
                soldAmount={soldAmount}
                setSoldAmount={setSoldAmount}
                activeuser={activeuser}
                setActiveUser={setActiveUser}
            
                />

        {findstatus? 
                <div className='find-result-btn-coneiner'>
                <samp className='find-result-btn-coneiner-title'> Found 
                <samp className='find-result-btn-coneiner-result-count'>{userData.length}</samp> 
                products </samp> 
                <samp onClick={closefinde} className='closeFindeBtn'>Close Finde</samp>
                </div>:null
}

               
              
                        
                                                            <h1 className='products-header'> My Products</h1>
    
                                <AddProductBtn  addProductFunction={addProductFunction} product={product} />
        
      

<MyProducts userData={userData} setUserData={setUserData} setIsSelected={setIsSelected}
    setSoldAmount={setSoldAmount} setSelectedUser={setSelectedUser}     product={product} 
    setProduct={setProduct}

/>

      </div>
      : 

      <div className="sing-up-conteiner">

               {login? <Login singup={singup} setSingUp={setSingUp} login={login} setLogIn={setLogIn}/> :null}

                {singup? <SingUp singup={singup} setSingUp={setSingUp} />  : null}
      
      </div>
}



{inUerMode?

<>

<AllProductsConteiner userData={userData} />

</>

:null
}


</>
        );
}

export default ProductsConteiner;
