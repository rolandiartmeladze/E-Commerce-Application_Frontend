import React from 'react';

import './ProductsConteiner.css';
import '../UsersComponent/SingUp.css';




import AddNewProduct from '../CreatNewProduct/AddNewProduct';
import AddProductBtn from './AddProductBtn';
import MyProducts from './MyProducts';



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

        usermode:boolean;
    
      
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
        setActiveUser,

        usermode
    
  
}: UserContainerProps) {






        const addProductFunction = () => {product? setProduct(false):setProduct(true)};


                const closefinde = () => {
                            setFindStatus(false)
                            setNotound(false);
                            fetchData();
                            setFindInput('');
                        }



                                            

return (
<>

<div   style={{position: 'relative', width: '100%'}}  className='userTable'>

{/* {notfound? <LoadConteiner style={{height: '200px'}} > {" product No found "} <button onClick={closefinde}>close</button></LoadConteiner> : null }
{loading ? <Loaing />:null} */}
        <h1 className='products-header'> <samp>My Products</samp>{" "}<samp>Favorite</samp> </h1>


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

                {findstatus && 
                <div className='find-result-btn-coneiner'>
                <span className='find-result-btn-coneiner-title'> Found 
                  <span className='find-result-btn-coneiner-result-count'>{userData.length}</span> 
                  products 
                </span> 
                <span onClick={closefinde} className='closeFindeBtn'>Close Finde</span>
              </div>
              
        }


              
                        <>
    
                                <AddProductBtn  addProductFunction={addProductFunction} product={product} />
        
      

                                                <MyProducts 
                                                userData={userData} 
                                                setUserData={setUserData} 
                                                setIsSelected={setIsSelected}
                                                setSoldAmount={setSoldAmount} 
                                                setSelectedUser={setSelectedUser}     
                                                product={product} 
                                                setProduct={setProduct}
                                                activeuser={activeuser}

                                                />
</>


      </div>
    





<>


</>




</>
        );
}

export default ProductsConteiner;
